# -*- coding: utf-8 -*-
"""
@fileoverview Pure number conversion service for numerical system conversions
@version 1.0.0
@author Lead Software Engineer
@since 2025-08-26
@lastModified 2025-08-26

@description
Pure mathematical service for converting numbers between different numerical systems.
Optimized algorithm with O(1) performance for direct conversions and O(n) for general cases.

@dependencies
- fractions module for exact arithmetic
- app.core.exceptions for error handling

@usage
from app.services.number_conversion import NumberConversionService
service = NumberConversionService()
result = service.convert_number(number, from_base, to_base, precision)

@state
✅ Functional - Pure mathematical conversions

@bugs
- None currently identified

@todo
- Add support for bases > 16
- Optimize fractional conversions

@performance
- O(1) for direct 2↔8/16 conversions
- O(n) for general conversions
- Efficient memory usage

@security
- Input validation to prevent conversion errors
- Base range validation (2-16)
"""

import logging
from typing import Dict, Any, Optional
from fractions import Fraction
from app.core.exceptions import BusinessLogicException

logger = logging.getLogger(__name__)

# Symbols for bases up to 16
SYMBOLS = "0123456789ABCDEF"
SYMBOL_TO_VAL = {ch: i for i, ch in enumerate(SYMBOLS)}


class NumberConversionService:
    """Pure mathematical service for number system conversions."""
    
    def __init__(self):
        self.service_name = "NumberConversionService"
    
    def convert_number(
        self, 
        number: str, 
        from_base: int, 
        to_base: int, 
        precision: int = 20
    ) -> Dict[str, Any]:
        """
        Convert number between different numerical systems using optimized algorithm.
        
        Args:
            number: Number to convert
            from_base: Source base (2-16)
            to_base: Target base (2-16)
            precision: Precision for fractional parts
            
        Returns:
            Dict with conversion results and metadata
        """
        try:
            # Validate bases
            self._validate_base(from_base)
            self._validate_base(to_base)
            
            # Validate number input
            if not number:
                raise BusinessLogicException(
                    "El número a convertir no puede estar vacío",
                    operation="number_conversion"
                )
            
            # Clean and normalize number
            clean_number = self._clean_number(number)
            
            # Perform conversion
            converted_number = self._convert(clean_number, from_base, to_base, precision)
            
            # Generate conversion steps
            conversion_steps = self._generate_conversion_steps(
                number, from_base, to_base, converted_number
            )
            
            # Return pure conversion results
            return {
                "original_number": number,
                "original_base": from_base,
                "target_base": to_base,
                "converted_number": converted_number,
                "precision": precision,
                "algorithm_used": self._get_algorithm_used(from_base, to_base),
                "conversion_steps": conversion_steps,
                "base_names": {
                    "from": self._get_base_name(from_base),
                    "to": self._get_base_name(to_base)
                }
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Number conversion failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en conversión numérica: {str(e)}",
                operation="number_conversion"
            )
    
    # ========================================
    # OPTIMIZED CONVERSION ALGORITHM
    # ========================================
    
    def _clean_number(self, s: str) -> str:
        """Normalize decimal separator (comma or point) and uppercase."""
        s = s.strip().upper()
        return s.replace(",", ".")
    
    def _validate_base(self, b: int):
        """Validate that base is in allowed range."""
        if not (2 <= b <= 16):
            raise BusinessLogicException(
                f"Base {b} no válida. Debe estar entre 2 y 16",
                operation="number_conversion"
            )
    
    def _symbol_value(self, ch: str) -> int:
        """Get numeric value of symbol."""
        if ch not in SYMBOL_TO_VAL:
            raise BusinessLogicException(
                f"Símbolo '{ch}' no válido para la base especificada",
                operation="number_conversion"
            )
        return SYMBOL_TO_VAL[ch]
    
    def _value_symbol(self, val: int) -> str:
        """Get symbol for numeric value."""
        if not (0 <= val <= 15):
            raise BusinessLogicException(
                f"Valor {val} fuera de rango para conversión",
                operation="number_conversion"
            )
        return SYMBOLS[val]
    
    def _separate_parts(self, numero: str) -> tuple[str, str]:
        """Separate integer and fractional parts."""
        if "." in numero:
            parte_entera, parte_fraccionaria = numero.split(".", 1)
            return parte_entera, parte_fraccionaria
        return numero, ""
    
    def _group_binary(self, bin_str: str, group_size: int) -> list[str]:
        """Group binary digits for direct conversion."""
        # Pad with leading zeros if necessary
        padding = (group_size - len(bin_str) % group_size) % group_size
        padded = "0" * padding + bin_str
        
        groups = []
        for i in range(0, len(padded), group_size):
            groups.append(padded[i:i + group_size])
        return groups
    
    def _bin_to_base_direct(self, bin_str: str, target_base: int) -> str:
        """Direct binary to octal/hex conversion using bit grouping - O(1) performance."""
        if target_base == 8:
            groups = self._group_binary(bin_str, 3)
            result = ""
            for group in groups:
                decimal_val = int(group, 2)
                result += self._value_symbol(decimal_val)
            return result.lstrip("0") or "0"
        
        elif target_base == 16:
            groups = self._group_binary(bin_str, 4)
            result = ""
            for group in groups:
                decimal_val = int(group, 2)
                result += self._value_symbol(decimal_val)
            return result.lstrip("0") or "0"
        
        else:
            raise BusinessLogicException(
                f"Conversión directa no soportada para base {target_base}",
                operation="number_conversion"
            )
    
    def _base_to_bin_direct(self, numero: str, source_base: int) -> str:
        """Direct octal/hex to binary conversion - O(1) performance."""
        if source_base == 8:
            result = ""
            for ch in numero:
                decimal_val = self._symbol_value(ch)
                result += format(decimal_val, "03b")
            return result.lstrip("0") or "0"
        
        elif source_base == 16:
            result = ""
            for ch in numero:
                decimal_val = self._symbol_value(ch)
                result += format(decimal_val, "04b")
            return result.lstrip("0") or "0"
        
        else:
            raise BusinessLogicException(
                f"Conversión directa no soportada para base {source_base}",
                operation="number_conversion"
            )
    
    def _to_decimal_fraction(self, numero: str, base: int) -> Fraction:
        """Convert number from given base to decimal using Fraction for exact arithmetic."""
        parte_entera, parte_fraccionaria = self._separate_parts(numero)
        
        # Convert integer part
        decimal_int = 0
        for i, ch in enumerate(reversed(parte_entera)):
            decimal_int += self._symbol_value(ch) * (base ** i)
        
        # Convert fractional part
        decimal_frac = Fraction(0)
        for i, ch in enumerate(parte_fraccionaria):
            decimal_frac += Fraction(self._symbol_value(ch), base ** (i + 1))
        
        return Fraction(decimal_int) + decimal_frac
    
    def _from_decimal_fraction(self, decimal: Fraction, target_base: int, precision: int) -> str:
        """Convert decimal to target base with configurable precision."""
        # Convert integer part
        int_part = int(decimal)
        if int_part == 0:
            int_result = "0"
        else:
            int_result = ""
            temp = int_part
            while temp > 0:
                int_result = self._value_symbol(temp % target_base) + int_result
                temp //= target_base
        
        # Convert fractional part
        frac_part = decimal - int_part
        if frac_part == 0:
            return int_result
        
        frac_result = ""
        temp_frac = frac_part
        for _ in range(precision):
            if temp_frac == 0:
                break
            temp_frac *= target_base
            int_digit = int(temp_frac)
            frac_result += self._value_symbol(int_digit)
            temp_frac -= int_digit
        
        return f"{int_result}.{frac_result.rstrip('0')}" if frac_result else int_result
    
    def _convert(self, numero: str, base_origen: int, base_destino: int, precision: int = 20) -> str:
        """Main conversion function with optimized algorithm."""
        self._validate_base(base_origen)
        self._validate_base(base_destino)
        numero = self._clean_number(numero)
        
        # Direct conversion 2 <-> (8|16) - MUCH MORE EFFICIENT - O(1) performance
        if base_origen == 2 and base_destino in (8, 16):
            return self._bin_to_base_direct(numero, base_destino)
        if base_destino == 2 and base_origen in (8, 16):
            return self._base_to_bin_direct(numero, base_origen)
        
        # General: origin -> decimal -> destination - O(n) performance
        dec = self._to_decimal_fraction(numero, base_origen)
        return self._from_decimal_fraction(dec, base_destino, precision)
    
    def _get_algorithm_used(self, from_base: int, to_base: int) -> str:
        """Determine which algorithm was used for the conversion."""
        if (from_base == 2 and to_base in (8, 16)) or (to_base == 2 and from_base in (8, 16)):
            return "direct_bit_grouping - O(1) performance"
        else:
            return "general_decimal_intermediate - O(n) performance"
    
    def _generate_conversion_steps(
        self, 
        original: str, 
        from_base: int, 
        to_base: int, 
        result: str
    ) -> Dict[str, str]:
        """Generate detailed conversion steps for the user."""
        algorithm = self._get_algorithm_used(from_base, to_base)
        
        if "direct_bit_grouping" in algorithm:
            if from_base == 2:
                return {
                    "step1": f"Detectada conversión directa {self._get_base_name(from_base)} ↔ {self._get_base_name(to_base)}",
                    "step2": f"Agrupación de bits en bloques de {3 if to_base == 8 else 4}",
                    "step3": f"Conversión directa por grupo: {original} → {result}",
                    "step4": "Algoritmo optimizado: O(1) performance"
                }
            else:
                return {
                    "step1": f"Conversión directa de base {from_base} a binario",
                    "step2": f"Agrupación de bits en bloques de {3 if from_base == 8 else 4}",
                    "step3": f"Conversión directa por grupo: {original} → {result}",
                    "step4": "Algoritmo optimizado: O(1) performance"
                }
        else:
            return {
                "step1": f"Parsear '{original}' desde base {from_base} ({self._get_base_name(from_base)})",
                "step2": "Convertir a decimal usando polinomio de potencias",
                "step3": f"Convertir desde decimal a base {to_base} ({self._get_base_name(to_base)})",
                "step4": f"Resultado final: {result}",
                "step5": "Algoritmo general: O(n) performance"
            }
    
    def _get_base_name(self, base: int) -> str:
        """Get human-readable name for base."""
        base_names = {
            2: "Binario", 3: "Ternario", 4: "Cuaternario", 5: "Quinario",
            6: "Senario", 7: "Septenario", 8: "Octal", 9: "Nonario",
            10: "Decimal", 11: "Undecimal", 12: "Duodecimal", 13: "Tridecimal",
            14: "Tetradecimal", 15: "Pentadecimal", 16: "Hexadecimal"
        }
        return base_names.get(base, f"Base {base}")
