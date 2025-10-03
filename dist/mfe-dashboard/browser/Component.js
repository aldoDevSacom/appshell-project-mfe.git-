// apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts
import { ChangeDetectionStrategy as ChangeDetectionStrategy5, Component as Component5 } from "@angular/core";

// apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.ts
import { ChangeDetectionStrategy as ChangeDetectionStrategy4, Component as Component4 } from "@angular/core";

// apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.ts
import { ChangeDetectionStrategy as ChangeDetectionStrategy3, Component as Component3 } from "@angular/core";

// apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.ts
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { NgFor, NgClass } from "@angular/common";
import * as i0 from "@angular/core";
function MetricsGrid_div_1_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "div", 2)(1, "p", 3);
    i0.\u0275\u0275text(2);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(3, "p", 4);
    i0.\u0275\u0275text(4);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(5, "p", 5);
    i0.\u0275\u0275text(6);
    i0.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const metric_r1 = ctx.$implicit;
    const ctx_r1 = i0.\u0275\u0275nextContext();
    i0.\u0275\u0275advance(2);
    i0.\u0275\u0275textInterpolate(metric_r1.title);
    i0.\u0275\u0275advance(2);
    i0.\u0275\u0275textInterpolate(metric_r1.value);
    i0.\u0275\u0275advance();
    i0.\u0275\u0275property("ngClass", ctx_r1.trendClass(metric_r1.trendColor));
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate(metric_r1.trend);
  }
}
var MetricsGrid = class _MetricsGrid {
  metrics = [];
  trendClass(trend) {
    return trend === "positive" ? "text-green-500" : "text-red-500";
  }
  metricTrack = (_, metric) => metric.title;
  static \u0275fac = function MetricsGrid_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MetricsGrid)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _MetricsGrid, selectors: [["app-metrics-grid"]], inputs: { metrics: "metrics" }, decls: 2, vars: 2, consts: [[1, "flex", "flex-wrap", "gap-6", "pb-8"], ["class", "flex min-w-[180px] flex-1 flex-col gap-3 rounded-3xl bg-white/60 p-6 card-shadow backdrop-blur-sm dark:bg-slate-900/70", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "min-w-[180px]", "flex-1", "flex-col", "gap-3", "rounded-3xl", "bg-white/60", "p-6", "card-shadow", "backdrop-blur-sm", "dark:bg-slate-900/70"], [1, "text-lg", "font-semibold", "leading-normal", "text-slate-700", "dark:text-slate-200"], [1, "text-4xl", "font-black", "leading-tight", "tracking-tighter", "text-slate-800", "dark:text-white"], [1, "text-lg", "font-bold", "leading-normal", 3, "ngClass"]], template: function MetricsGrid_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "div", 0);
      i0.\u0275\u0275template(1, MetricsGrid_div_1_Template, 7, 4, "div", 1);
      i0.\u0275\u0275elementEnd();
    }
    if (rf & 2) {
      i0.\u0275\u0275advance();
      i0.\u0275\u0275property("ngForOf", ctx.metrics)("ngForTrackBy", ctx.metricTrack);
    }
  }, dependencies: [NgFor, NgClass], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(MetricsGrid, { className: "MetricsGrid", filePath: "apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.ts", lineNumber: 19 });
})();

// apps/mfe-dashboard/src/app/components/orders-table/orders-table.ts
import { ChangeDetectionStrategy as ChangeDetectionStrategy2, Component as Component2, Input as Input2 } from "@angular/core";
import { NgFor as NgFor2, NgClass as NgClass2 } from "@angular/common";
import * as i02 from "@angular/core";
function OrdersTable_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "tr", 9)(1, "td", 10);
    i02.\u0275\u0275text(2);
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(3, "td", 11)(4, "button", 12)(5, "span", 13);
    i02.\u0275\u0275text(6);
    i02.\u0275\u0275elementEnd()()();
    i02.\u0275\u0275elementStart(7, "td", 14);
    i02.\u0275\u0275text(8);
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(9, "td", 15);
    i02.\u0275\u0275text(10);
    i02.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r1 = ctx.$implicit;
    const ctx_r1 = i02.\u0275\u0275nextContext();
    i02.\u0275\u0275advance(2);
    i02.\u0275\u0275textInterpolate1(" ", order_r1.customer, " ");
    i02.\u0275\u0275advance(2);
    i02.\u0275\u0275property("ngClass", ctx_r1.statusClasses(order_r1));
    i02.\u0275\u0275advance(2);
    i02.\u0275\u0275textInterpolate(order_r1.status);
    i02.\u0275\u0275advance(2);
    i02.\u0275\u0275textInterpolate1(" ", order_r1.folio, " ");
    i02.\u0275\u0275advance(2);
    i02.\u0275\u0275textInterpolate1(" ", order_r1.date, " ");
  }
}
var OrdersTable = class _OrdersTable {
  orders = [];
  statusClasses(order) {
    if (order.statusVariant === "gradient") {
      return "animated-gradient text-white shadow-lg";
    }
    return "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100";
  }
  trackOrder = (_, order) => order.folio;
  static \u0275fac = function OrdersTable_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrdersTable)();
  };
  static \u0275cmp = /* @__PURE__ */ i02.\u0275\u0275defineComponent({ type: _OrdersTable, selectors: [["app-orders-table"]], inputs: { orders: "orders" }, decls: 20, vars: 2, consts: [[1, "rounded-3xl", "bg-white/60", "px-4", "py-4", "card-shadow", "backdrop-blur-sm", "dark:bg-slate-900/70"], [1, "overflow-hidden", "rounded-2xl"], [1, "table-fixed-wrap", "w-full"], [1, "w-1/2"], [1, "w-1/6"], [1, "bg-transparent"], [1, "px-6", "py-4", "text-left", "text-base", "font-semibold", "leading-normal", "text-slate-800", "dark:text-slate-100"], [1, "px-6", "py-4", "text-center", "text-base", "font-semibold", "leading-normal", "text-slate-800", "dark:text-slate-100"], ["class", "border-t border-slate-200/50 dark:border-slate-700/60", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "border-t", "border-slate-200/50", "dark:border-slate-700/60"], [1, "px-6", "py-3", "text-left", "text-base", "font-normal", "leading-normal", "text-slate-700", "dark:text-slate-200"], [1, "px-6", "py-3", "text-center"], ["type", "button", 1, "flex", "h-10", "w-full", "min-w-[84px]", "max-w-[220px]", "items-center", "justify-center", "overflow-hidden", "rounded-full", "px-4", "text-base", "font-medium", "leading-normal", "transition", 3, "ngClass"], [1, "truncate"], [1, "px-6", "py-3", "text-center", "text-base", "font-normal", "leading-normal", "text-slate-500", "dark:text-slate-400"], [1, "px-6", "py-3", "text-center", "text-base", "font-normal", "leading-normal", "text-slate-600", "dark:text-slate-300"]], template: function OrdersTable_Template(rf, ctx) {
    if (rf & 1) {
      i02.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "table", 2)(3, "colgroup");
      i02.\u0275\u0275element(4, "col", 3)(5, "col", 4)(6, "col", 4)(7, "col", 4);
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(8, "thead")(9, "tr", 5)(10, "th", 6);
      i02.\u0275\u0275text(11, " Cliente ");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(12, "th", 7);
      i02.\u0275\u0275text(13, " Estatus ");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(14, "th", 7);
      i02.\u0275\u0275text(15, " Folio ");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(16, "th", 7);
      i02.\u0275\u0275text(17, " Fecha ");
      i02.\u0275\u0275elementEnd()()();
      i02.\u0275\u0275elementStart(18, "tbody");
      i02.\u0275\u0275template(19, OrdersTable_tr_19_Template, 11, 5, "tr", 8);
      i02.\u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      i02.\u0275\u0275advance(19);
      i02.\u0275\u0275property("ngForOf", ctx.orders)("ngForTrackBy", ctx.trackOrder);
    }
  }, dependencies: [NgFor2, NgClass2], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassDebugInfo(OrdersTable, { className: "OrdersTable", filePath: "apps/mfe-dashboard/src/app/components/orders-table/orders-table.ts", lineNumber: 20 });
})();

// apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.ts
import * as i03 from "@angular/core";
var DashboardContentComponent = class _DashboardContentComponent {
  metrics = [
    { title: "Ordenes Abiertas", value: "35", trend: "+10%", trendColor: "positive" },
    { title: "Ordenes de Hoy", value: "8", trend: "-5%", trendColor: "negative" },
    { title: "Tiempo Promedio", value: "3.2 h", trend: "+2%", trendColor: "positive" }
  ];
  orders = [
    { customer: "MALLAS ORI\xD3N-FUNDADORES", status: "Iniciada", statusVariant: "gradient", folio: "# 47856890", date: "12-09-2025" },
    { customer: "FUMICOUNTRY AMBIENTAL SAS FUMICOUNTRY AMBIENTAL SAS-BOGOT\xC1", status: "Completada", statusVariant: "neutral", folio: "# 09875432", date: "12-09-2025" },
    { customer: "GR\xDAAS ECON\xD3MICAS DELTA-NI\xD1OS HEROES", status: "Rechazada", statusVariant: "neutral", folio: "# 67894321", date: "12-09-2025" },
    { customer: "Spring Launch", status: "Iniciada", statusVariant: "gradient", folio: "# 12340987", date: "12-09-2025" },
    { customer: "Year-End Clearance", status: "Completada", statusVariant: "neutral", folio: "# 92018476", date: "12-09-2025" }
  ];
  static \u0275fac = function DashboardContentComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardContentComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i03.\u0275\u0275defineComponent({ type: _DashboardContentComponent, selectors: [["app-dashboard-content"]], decls: 4, vars: 2, consts: [[1, "flex", "flex-col", "gap-8"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [3, "metrics"], [3, "orders"]], template: function DashboardContentComponent_Template(rf, ctx) {
    if (rf & 1) {
      i03.\u0275\u0275elementStart(0, "section", 0);
      i03.\u0275\u0275element(1, "div", 1)(2, "app-metrics-grid", 2)(3, "app-orders-table", 3);
      i03.\u0275\u0275elementEnd();
    }
    if (rf & 2) {
      i03.\u0275\u0275advance(2);
      i03.\u0275\u0275property("metrics", ctx.metrics);
      i03.\u0275\u0275advance();
      i03.\u0275\u0275property("orders", ctx.orders);
    }
  }, dependencies: [MetricsGrid, OrdersTable], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassDebugInfo(DashboardContentComponent, { className: "DashboardContentComponent", filePath: "apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.ts", lineNumber: 13 });
})();

// apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.ts
import * as i04 from "@angular/core";
var DashboardLayout = class _DashboardLayout {
  static \u0275fac = function DashboardLayout_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardLayout)();
  };
  static \u0275cmp = /* @__PURE__ */ i04.\u0275\u0275defineComponent({ type: _DashboardLayout, selectors: [["app-dashboard-layout"]], decls: 1, vars: 0, template: function DashboardLayout_Template(rf, ctx) {
    if (rf & 1) {
      i04.\u0275\u0275element(0, "app-dashboard-content");
    }
  }, dependencies: [DashboardContentComponent], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i04.\u0275setClassDebugInfo(DashboardLayout, { className: "DashboardLayout", filePath: "apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.ts", lineNumber: 13 });
})();

// apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts
import * as i05 from "@angular/core";
var RemoteEntryComponent = class _RemoteEntryComponent {
  static \u0275fac = function RemoteEntryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RemoteEntryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i05.\u0275\u0275defineComponent({ type: _RemoteEntryComponent, selectors: [["mfe-dashboard-entry"]], decls: 1, vars: 0, template: function RemoteEntryComponent_Template(rf, ctx) {
    if (rf & 1) {
      i05.\u0275\u0275element(0, "app-dashboard-layout");
    }
  }, dependencies: [DashboardLayout], styles: ["\n\n/*# sourceMappingURL=remote-entry.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i05.\u0275setClassDebugInfo(RemoteEntryComponent, { className: "RemoteEntryComponent", filePath: "apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts", lineNumber: 13 });
})();
export {
  RemoteEntryComponent
};
//# sourceMappingURL=Component.js.map
