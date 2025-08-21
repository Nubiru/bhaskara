#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Conversor de sistemas de numeración (bases 2..16).
Implementa el algoritmo:
1) Caso directo: 2 <-> 8/16 mediante agrupación de bits.
2) General: origen -> decimal (polinomio de potencias) -> destino.
   - Parte entera: divisiones sucesivas.
   - Parte fraccionaria: multiplicaciones sucesivas.
Uso:
  - Interactivo: ejecutar sin argumentos y responder a los prompts.
  - Por CLI: python conversion_numerica.py --numero 2B8 --origen 16 --destino 8 --precision 16
"""
import argparse
from fractions import Fraction

SYMBOLS = "0123456789ABCDEF"
SYMBOL_TO_VAL = {ch: i for i, ch in enumerate(SYMBOLS)}

def limpiar_numero(s: str) -> str:
    """Normaliza el separador decimal (coma o punto) y mayúsculas."""
    s = s.strip().upper()
    return s.replace(",", ".")

def validar_base(b: int):
    if not (2 <= b <= 16):
        raise ValueError("Base fuera de rango (admite 2..16).")

def valor_simbolo(ch: str) -> int:
    if ch not in SYMBOL_TO_VAL:
        raise ValueError(f"Símbolo inválido: {ch}")
    return SYMBOL_TO_VAL[ch]

def simbolo_valor(v: int) -> str:
    if not (0 <= v < len(SYMBOLS)):
        raise ValueError(f"Valor de dígito fuera de rango: {v}")
    return SYMBOLS[v]

def separar_partes(num: str):
    """Devuelve (parte_entera_str, parte_frac_str) sin signo ni prefijos."""
    if "." in num:
        a, b = num.split(".", 1)
    else:
        a, b = num, ""
    return a, b

# ---------- Conversión directa (2 <-> 8/16) ----------
def agrupar_binario(bits: str, tam: int, izquierda=True) -> list[str]:
    """Agrupa una cadena de bits en bloques de tamaño tam, 
    padding con ceros a la izquierda (parte entera) o derecha (fracción)."""
    if not bits:
        return []
    if izquierda:
        # parte entera: rellenar a la izquierda
        resto = len(bits) % tam
        if resto:
            bits = "0" * (tam - resto) + bits
        return [bits[i:i+tam] for i in range(0, len(bits), tam)]
    else:
        # parte fracc: rellenar a la derecha
        resto = len(bits) % tam
        if resto:
            bits = bits + "0" * (tam - resto)
        return [bits[i:i+tam] for i in range(0, len(bits), tam)]

def bin_to_base_direct(num: str, base_dest: int) -> str:
    tam = 3 if base_dest == 8 else 4
    ent, frac = separar_partes(num)
    ent = ent or "0"
    # Validación de binario
    if any(ch not in "01" for ch in ent + frac):
        raise ValueError("Número binario inválido para conversión directa.")
    grupos_ent = agrupar_binario(ent, tam, izquierda=True)
    grupos_frac = agrupar_binario(frac, tam, izquierda=False)
    # convertir cada grupo
    out_ent = "".join(simbolo_valor(int(g, 2)) for g in grupos_ent) or "0"
    out_ent = out_ent.lstrip("0") or "0"
    out_frac = "".join(simbolo_valor(int(g, 2)) for g in grupos_frac)
    out = out_ent
    if out_frac:
        # quitar ceros de la derecha
        out_frac = out_frac.rstrip("0")
        if out_frac:
            out += "." + out_frac
    return out

def base_to_bin_direct(num: str, base_src: int) -> str:
    mapa = {8:3, 16:4}
    tam = mapa[base_src]
    ent, frac = separar_partes(num)
    # validar símbolos
    for ch in ent + frac:
        if ch and ch != ".":
            v = valor_simbolo(ch)
            if v >= base_src:
                raise ValueError(f"Dígito '{ch}' inválido para base {base_src}.")
    # cada dígito -> grupo binario con padding
    def dig_to_bits(ch):
        v = valor_simbolo(ch)
        return format(v, f"0{tam}b")
    out_ent = "".join(dig_to_bits(ch) for ch in ent) or "0"
    out_ent = out_ent.lstrip("0") or "0"
    out_frac = "".join(dig_to_bits(ch) for ch in frac)
    out = out_ent
    if out_frac:
        out_frac = out_frac.rstrip("0")
        if out_frac:
            out += "." + out_frac
    return out

# ---------- General: origen -> decimal (Fraction) ----------
def a_decimal_fraction(num: str, base_src: int) -> Fraction:
    num = limpiar_numero(num)
    ent, frac = separar_partes(num)
    # validar y convertir parte entera
    val_ent = 0
    pot = 1
    for ch in reversed(ent) if ent else []:
        v = valor_simbolo(ch)
        if v >= base_src:
            raise ValueError(f"Dígito '{ch}' inválido para base {base_src}.")
        val_ent += v * pot
        pot *= base_src
    # parte fracc como fracción exacta
    val_frac = Fraction(0,1)
    pot_neg = base_src
    for ch in frac:
        v = valor_simbolo(ch)
        if v >= base_src:
            raise ValueError(f"Dígito '{ch}' inválido para base {base_src}.")
        val_frac += Fraction(v, pot_neg)
        pot_neg *= base_src
    return Fraction(val_ent,1) + val_frac

# ---------- Decimal (Fraction) -> base destino ----------
def desde_decimal_fraction(value: Fraction, base_dest: int, precision: int=20) -> str:
    # parte entera (divisiones sucesivas)
    ent = value.numerator // value.denominator
    fr = value - ent
    if ent == 0:
        out_ent = "0"
    else:
        digits = []
        while ent > 0:
            digits.append(simbolo_valor(ent % base_dest))
            ent //= base_dest
        out_ent = "".join(reversed(digits))
    # parte fracc (multiplicaciones sucesivas)
    out_frac = ""
    count = 0
    while fr != 0 and count < precision:
        fr *= base_dest
        d = fr.numerator // fr.denominator
        out_frac += simbolo_valor(d)
        fr -= d
        count += 1
    return out_ent if not out_frac else f"{out_ent}.{out_frac}"

# ---------- Orquestador ----------
def convertir(numero: str, base_origen: int, base_destino: int, precision: int=20) -> str:
    validar_base(base_origen)
    validar_base(base_destino)
    numero = limpiar_numero(numero)

    # Conversión directa 2 <-> (8|16)
    if base_origen == 2 and base_destino in (8,16):
        return bin_to_base_direct(numero, base_destino)
    if base_destino == 2 and base_origen in (8,16):
        return base_to_bin_direct(numero, base_origen)

    # General: origen -> decimal -> destino
    dec = a_decimal_fraction(numero, base_origen)
    return desde_decimal_fraction(dec, base_destino, precision)

def main():
    parser = argparse.ArgumentParser(description="Conversor de bases (2..16) con fracciones y casos directos 2<->8/16.")
    parser.add_argument("--numero", "-n", type=str, help="Número a convertir (usa punto o coma para fracción)")
    parser.add_argument("--origen", "-o", type=int, help="Base de origen (2..16)")
    parser.add_argument("--destino", "-d", type=int, help="Base de destino (2..16)")
    parser.add_argument("--precision", "-p", type=int, default=20, help="Dígitos máximos en la fracción de salida (default 20)")
    # En entornos Jupyter/Colab, IPython agrega argumentos desconocidos (p.ej. -f ...json).
    # Usamos parse_known_args() para ignorarlos y mantener el modo interactivo si faltan parámetros.
    args, _unknown = parser.parse_known_args()

    if args.numero is None or args.origen is None or args.destino is None:
        # Modo interactivo
        print("== Conversor de Bases (2..16) ==")
        numero = input("Ingrese número: ").strip()
        base_origen = int(input("Base de origen (2..16): ").strip())
        base_destino = int(input("Base de destino (2..16): ").strip())
        precision = int(input("Precisión fraccionaria (dígitos, default 20): ") or "20")
    else:
        numero = args.numero
        base_origen = args.origen
        base_destino = args.destino
        precision = args.precision

    try:
        res = convertir(numero, base_origen, base_destino, precision)
        print(f"Resultado: {res} (base {base_destino})")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
