import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("history", "routes/history.tsx"),
  route("about", "routes/about.tsx"),
  
  // Business Analysis Routes
  route("analysis", "routes/analysis.tsx", [
    index("routes/analysis/bhaskara.tsx"),
    route("revenue", "routes/analysis/revenue.tsx"),
    route("costs", "routes/analysis/costs.tsx"),
    route("profit", "routes/analysis/profit.tsx"),
    route("break-even", "routes/analysis/break-even.tsx"),
  ]),
] satisfies RouteConfig;
