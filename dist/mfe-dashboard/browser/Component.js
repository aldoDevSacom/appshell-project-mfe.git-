// apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts
import { ChangeDetectionStrategy as ChangeDetectionStrategy5, Component as Component5, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";

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
import { SessionService, SessionEventType } from "@app/session-service";
import * as i05 from "@angular/core";
import * as i1 from "@angular/common";
function RemoteEntryComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    i05.\u0275\u0275elementStart(0, "span", 6);
    i05.\u0275\u0275text(1);
    i05.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i05.\u0275\u0275nextContext();
    i05.\u0275\u0275advance();
    i05.\u0275\u0275textInterpolate(ctx_r0.user.displayName);
  }
}
var RemoteEntryComponent = class _RemoteEntryComponent {
  // Inyectar SessionService
  sessionService = inject(SessionService);
  subscription = new Subscription();
  // Estado del componente
  isAuthenticated = false;
  user = null;
  roles = [];
  hasToken = false;
  eventCount = 0;
  showDebug = true;
  // Cambiar a false en producción
  // Propiedades computadas para la UI
  get sessionStatusClass() {
    if (!this.isAuthenticated)
      return "not-authenticated";
    if (this.user)
      return "authenticated";
    return "loading";
  }
  get sessionIcon() {
    if (!this.isAuthenticated)
      return "\u{1F512}";
    if (this.user)
      return "\u2705";
    return "\u23F3";
  }
  get sessionStatusText() {
    if (!this.isAuthenticated)
      return "No autenticado";
    if (this.user)
      return "Sesi\xF3n activa";
    return "Cargando...";
  }
  ngOnInit() {
    console.log("\u{1F3D7}\uFE0F MFE Dashboard: Inicializando con SessionService compartido");
    if (!this.sessionService) {
      console.error("\u274C MFE Dashboard: SessionService no est\xE1 disponible!");
      return;
    }
    console.log("\u2705 MFE Dashboard: SessionService detectado, configurando suscripciones...");
    this.loadSessionState();
    this.subscribeToSessionChanges();
  }
  ngOnDestroy() {
    console.log("\u{1F9F9} MFE Dashboard: Limpiando suscripciones");
    this.subscription.unsubscribe();
  }
  loadSessionState() {
    try {
      this.isAuthenticated = this.sessionService.isAuthenticated();
      this.user = this.sessionService.getUser();
      this.roles = this.sessionService.getRoles();
      this.hasToken = !!this.sessionService.getToken();
      console.log("\u{1F4CA} MFE Dashboard: Estado de sesi\xF3n cargado", {
        isAuthenticated: this.isAuthenticated,
        user: this.user?.displayName,
        roles: this.roles,
        hasToken: this.hasToken
      });
    } catch (error) {
      console.error("\u274C MFE Dashboard: Error al cargar estado de sesi\xF3n", error);
    }
  }
  subscribeToSessionChanges() {
    this.subscription.add(this.sessionService.onSessionChange().subscribe((event) => {
      this.eventCount++;
      console.log("\u{1F514} MFE Dashboard: Evento de sesi\xF3n recibido", event);
      switch (event.type) {
        case SessionEventType.LOGIN_SUCCESS:
          console.log("\u2705 MFE Dashboard: Login exitoso detectado");
          this.loadSessionState();
          break;
        case SessionEventType.LOGOUT:
          console.log("\u{1F6AA} MFE Dashboard: Logout detectado");
          this.clearSessionState();
          break;
        case SessionEventType.TOKEN_REFRESHED:
          console.log("\u{1F504} MFE Dashboard: Token renovado");
          this.loadSessionState();
          break;
        case SessionEventType.SESSION_EXPIRED:
          console.log("\u23F0 MFE Dashboard: Sesi\xF3n expirada");
          this.clearSessionState();
          break;
        case SessionEventType.USER_SWITCHED:
          console.log("\u{1F464} MFE Dashboard: Usuario cambiado");
          this.loadSessionState();
          break;
      }
    }));
  }
  clearSessionState() {
    this.isAuthenticated = false;
    this.user = null;
    this.roles = [];
    this.hasToken = false;
  }
  static \u0275fac = function RemoteEntryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RemoteEntryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i05.\u0275\u0275defineComponent({ type: _RemoteEntryComponent, selectors: [["mfe-dashboard-entry"]], decls: 9, vars: 4, consts: [[1, "mfe-dashboard-container"], [1, "session-indicator", 3, "ngClass"], [1, "session-info"], [1, "status-icon"], [1, "status-text"], ["class", "user-name", 4, "ngIf"], [1, "user-name"]], template: function RemoteEntryComponent_Template(rf, ctx) {
    if (rf & 1) {
      i05.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      i05.\u0275\u0275text(4);
      i05.\u0275\u0275elementEnd();
      i05.\u0275\u0275elementStart(5, "span", 4);
      i05.\u0275\u0275text(6);
      i05.\u0275\u0275elementEnd();
      i05.\u0275\u0275template(7, RemoteEntryComponent_span_7_Template, 2, 1, "span", 5);
      i05.\u0275\u0275elementEnd()();
      i05.\u0275\u0275element(8, "app-dashboard-layout");
      i05.\u0275\u0275elementEnd();
    }
    if (rf & 2) {
      i05.\u0275\u0275advance();
      i05.\u0275\u0275property("ngClass", ctx.sessionStatusClass);
      i05.\u0275\u0275advance(3);
      i05.\u0275\u0275textInterpolate(ctx.sessionIcon);
      i05.\u0275\u0275advance(2);
      i05.\u0275\u0275textInterpolate(ctx.sessionStatusText);
      i05.\u0275\u0275advance();
      i05.\u0275\u0275property("ngIf", ctx.user);
    }
  }, dependencies: [CommonModule, i1.NgClass, i1.NgIf, DashboardLayout], styles: ["\n\n.mfe-dashboard-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.session-indicator[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 10px;\n  right: 10px;\n  z-index: 1000;\n  padding: 8px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.session-indicator.authenticated[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #059669);\n  color: white;\n  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);\n}\n.session-indicator.not-authenticated[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #dc2626);\n  color: white;\n  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);\n}\n.session-indicator.loading[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n  color: white;\n  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);\n}\n.session-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.status-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.user-name[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  opacity: 0.9;\n}\n.debug-panel[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  background: rgba(0, 0, 0, 0.9);\n  color: white;\n  padding: 12px;\n  border-radius: 8px;\n  font-size: 11px;\n  max-width: 300px;\n  z-index: 999;\n}\n.debug-panel[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  color: #60a5fa;\n}\n.debug-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0;\n}\n/*# sourceMappingURL=remote-entry.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i05.\u0275setClassDebugInfo(RemoteEntryComponent, { className: "RemoteEntryComponent", filePath: "apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts", lineNumber: 106 });
})();
export {
  RemoteEntryComponent
};
//# sourceMappingURL=Component.js.map
