import {
  DashboardHeader,
  init_dashboard_header
} from "./chunk-AUJVBIT5.js";
import {
  MetricsGrid,
  init_metrics_grid
} from "./chunk-WW6PLZ2I.js";
import {
  OrdersTable,
  init_orders_table
} from "./chunk-4CNQZCCT.js";
import {
  SidebarMenu,
  init_sidebar_menu
} from "./chunk-KACOCJMV.js";
import {
  ChangeDetectionStrategy,
  Component,
  __decorate,
  init_core,
  init_tslib_es6
} from "./chunk-XVQEXZI5.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.html
var dashboard_layout_default;
var init_dashboard_layout = __esm({
  "angular:jit:template:apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.html"() {
    dashboard_layout_default = '<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">\n  <div class="flex h-full grow flex-col">\n    <app-dashboard-header></app-dashboard-header>\n\n    <div class="flex w-full flex-1 gap-4 px-6 py-5">\n      <app-sidebar-menu [main]="mainNav" [sections]="navSections" [utilities]="utilityItems"></app-sidebar-menu>\n\n      <div class="flex h-full min-h-[700px] w-full flex-col justify-between rounded-3xl">\n        <main class="flex w-full max-w-full flex-col px-4 py-8">\n          <div class="flex flex-wrap items-center justify-between gap-3 pb-6">\n            <p class="min-w-72 text-4xl font-extrabold leading-tight tracking-tight text-slate-800 dark:text-white">\n              Dashboard\n            </p>\n          </div>\n\n          <app-metrics-grid [metrics]="metrics"></app-metrics-grid>\n\n          <app-orders-table [orders]="orders"></app-orders-table>\n        </main>\n      </div>\n    </div>\n  </div>\n</div>\n';
  }
});

// angular:jit:style:apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.css
var dashboard_layout_default2;
var init_dashboard_layout2 = __esm({
  "angular:jit:style:apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.css"() {
    dashboard_layout_default2 = "/* apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.css */\n/*# sourceMappingURL=dashboard-layout.css.map */\n";
  }
});

// apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.ts
var DashboardLayout;
var init_dashboard_layout3 = __esm({
  "apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.ts"() {
    "use strict";
    init_tslib_es6();
    init_dashboard_layout();
    init_dashboard_layout2();
    init_core();
    init_dashboard_header();
    init_sidebar_menu();
    init_metrics_grid();
    init_orders_table();
    DashboardLayout = class DashboardLayout2 {
      mainNav = {
        id: "dashboard",
        label: "Dashboard",
        icon: "dashboard"
      };
      navSections = [
        {
          title: "Workflow Manager",
          items: [
            { id: "tasks", label: "Lista de Tareas", icon: "tasks" }
          ]
        },
        {
          divider: true,
          title: "Opciones Dinamicas",
          items: [
            { id: "create-order", label: "Crear Orden", icon: "create" },
            { id: "search-order", label: "Buscar Orden", icon: "search" },
            { id: "close-order", label: "Cerrar Orden", icon: "close" }
          ]
        },
        {
          divider: true,
          items: [
            { id: "sales", label: "Sales", icon: "sales" },
            { id: "marketing", label: "Marketing", icon: "marketing" },
            { id: "operations", label: "Operations", icon: "operations" },
            { id: "analytics", label: "Analytics", icon: "analytics" }
          ]
        }
      ];
      utilityItems = [
        { id: "settings", label: "Settings", icon: "settings" },
        { id: "help", label: "Help", icon: "help" }
      ];
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
    };
    DashboardLayout = __decorate([
      Component({
        selector: "app-dashboard-layout",
        standalone: true,
        imports: [DashboardHeader, SidebarMenu, MetricsGrid, OrdersTable],
        template: dashboard_layout_default,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [dashboard_layout_default2]
      })
    ], DashboardLayout);
  }
});

export {
  DashboardLayout,
  init_dashboard_layout3 as init_dashboard_layout
};
//# sourceMappingURL=chunk-QTTV644X.js.map
