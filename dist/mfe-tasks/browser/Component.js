// apps/mfe-tasks/src/app/remote-entry/remote-entry.component.ts
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NgClass, NgFor, CommonModule } from "@angular/common";
import { CardComponent, IconComponent } from "@appshell/ui";
import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@app/session-service";
import * as i2 from "@angular/common";
function RemoteEntryComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "div", 16);
    i0.\u0275\u0275text(1);
    i0.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i0.\u0275\u0275nextContext();
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate2(" Usuario: ", ctx_r0.user.displayName, " | Email: ", ctx_r0.user.email, " ");
  }
}
function RemoteEntryComponent_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "tr", 17)(1, "td", 18);
    i0.\u0275\u0275text(2);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(3, "td", 19)(4, "span", 20);
    i0.\u0275\u0275text(5);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275text(6);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(7, "td", 21)(8, "span", 22);
    i0.\u0275\u0275element(9, "ui-icon", 23);
    i0.\u0275\u0275text(10);
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(11, "td", 24);
    i0.\u0275\u0275text(12);
    i0.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r2 = ctx.$implicit;
    const ctx_r0 = i0.\u0275\u0275nextContext();
    i0.\u0275\u0275advance(2);
    i0.\u0275\u0275textInterpolate(task_r2.title);
    i0.\u0275\u0275advance(3);
    i0.\u0275\u0275textInterpolate1(" ", ctx_r0.initials(task_r2.assignee), " ");
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate1(" ", task_r2.assignee, " ");
    i0.\u0275\u0275advance(2);
    i0.\u0275\u0275property("ngClass", ctx_r0.statusClass(task_r2.status));
    i0.\u0275\u0275advance();
    i0.\u0275\u0275property("name", ctx_r0.statusIcon(task_r2.status));
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate1(" ", task_r2.status, " ");
    i0.\u0275\u0275advance(2);
    i0.\u0275\u0275textInterpolate(task_r2.due);
  }
}
var RemoteEntryComponent = class _RemoteEntryComponent {
  sessionService;
  subscription = new Subscription();
  // Estado de sesión
  isAuthenticated = false;
  user = null;
  sessionStatus = "Verificando...";
  eventCount = 0;
  tasks = [
    { title: "Dise\xF1ar wireframes de onboarding", assignee: "Patricia G\xF3mez", status: "En progreso", due: "23 AGO" },
    { title: "Publicar campa\xF1a SEM", assignee: "Luis Rodr\xEDguez", status: "Pendiente", due: "21 AGO" },
    { title: "Actualizar pol\xEDticas IAM", assignee: "Fernanda Ruiz", status: "Completada", due: "18 AGO" },
    { title: "Analizar churn mensual", assignee: "Iv\xE1n Torres", status: "En progreso", due: "26 AGO" }
  ];
  constructor(sessionService) {
    this.sessionService = sessionService;
    console.log("[MFE-Tasks] Component initialized");
    this.loadSessionData();
  }
  ngOnInit() {
    console.log("[MFE-Tasks] OnInit - Setting up session monitoring");
    this.setupSessionSubscription();
  }
  ngOnDestroy() {
    console.log("[MFE-Tasks] OnDestroy - Cleaning up subscriptions");
    this.subscription.unsubscribe();
  }
  loadSessionData() {
    try {
      this.isAuthenticated = this.sessionService?.isAuthenticated() ?? false;
      this.user = this.sessionService?.getUser() ?? null;
      if (this.isAuthenticated && this.user) {
        this.sessionStatus = `\u2705 Sesi\xF3n activa - ${this.user.displayName}`;
      } else {
        this.sessionStatus = "\u274C Sin sesi\xF3n activa";
      }
      console.log("[MFE-Tasks] Session loaded:", {
        authenticated: this.isAuthenticated,
        user: this.user?.displayName,
        status: this.sessionStatus
      });
    } catch (error) {
      console.error("[MFE-Tasks] Error loading session:", error);
      this.sessionStatus = "\u26A0\uFE0F Error en sesi\xF3n";
    }
  }
  setupSessionSubscription() {
    if (this.sessionService) {
      this.subscription.add(this.sessionService.onSessionChange().subscribe((event) => {
        this.eventCount++;
        console.log("[MFE-Tasks] Session event received:", event.type, event);
        this.loadSessionData();
      }));
    }
  }
  initials(name) {
    return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  }
  statusClass(status) {
    switch (status) {
      case "Completada":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200";
      case "En progreso":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200";
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200";
    }
  }
  statusIcon(status) {
    switch (status) {
      case "Completada":
        return "check_circle";
      case "En progreso":
        return "hourglass_top";
      default:
        return "radio_button_unchecked";
    }
  }
  static \u0275fac = function RemoteEntryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RemoteEntryComponent)(i0.\u0275\u0275directiveInject(i1.SessionService));
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _RemoteEntryComponent, selectors: [["mfe-tasks-entry"]], decls: 30, vars: 4, consts: [[1, "space-y-6"], [1, "bg-blue-50", "dark:bg-blue-950", "border", "border-blue-200", "dark:border-blue-800", "rounded-lg", "p-4", "text-sm"], [1, "flex", "items-center", "justify-between"], [1, "font-medium", "text-blue-900", "dark:text-blue-100"], [1, "text-xs", "bg-blue-100", "dark:bg-blue-900", "px-2", "py-1", "rounded"], [1, "text-blue-700", "dark:text-blue-300", "mt-1"], ["class", "text-xs text-blue-600 dark:text-blue-400 mt-2", 4, "ngIf"], [1, "flex", "flex-col", "gap-2"], [1, "text-2xl", "font-semibold", "text-slate-900", "dark:text-white"], [1, "text-sm", "text-slate-500", "dark:text-slate-300"], [1, "overflow-x-auto"], [1, "min-w-full", "border-separate", "border-spacing-y-2", "text-sm"], [1, "text-left", "text-xs", "uppercase", "tracking-wide", "text-slate-400"], [1, "px-4", "py-2"], [1, "text-slate-600", "dark:text-slate-200"], ["class", "rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition dark:bg-slate-800 dark:ring-slate-700", 4, "ngFor", "ngForOf"], [1, "text-xs", "text-blue-600", "dark:text-blue-400", "mt-2"], [1, "rounded-xl", "bg-white", "shadow-sm", "ring-1", "ring-slate-100", "transition", "dark:bg-slate-800", "dark:ring-slate-700"], [1, "px-4", "py-3", "font-medium", "text-slate-900", "dark:text-white"], [1, "px-4", "py-3", "flex", "items-center", "gap-2"], [1, "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-full", "bg-blue-100", "text-blue-600", "dark:bg-blue-500/20", "dark:text-blue-200"], [1, "px-4", "py-3"], [1, "inline-flex", "items-center", "gap-2", "rounded-full", "px-3", "py-1", "text-xs", "font-medium", 3, "ngClass"], ["size", "sm", 3, "name"], [1, "px-4", "py-3", "text-slate-500", "dark:text-slate-300"]], template: function RemoteEntryComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      i0.\u0275\u0275text(4, "\u{1F517} MFE Tasks - Estado de Sesi\xF3n Compartida");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(5, "span", 4);
      i0.\u0275\u0275text(6);
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(7, "p", 5);
      i0.\u0275\u0275text(8);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275template(9, RemoteEntryComponent_div_9_Template, 2, 2, "div", 6);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(10, "header", 7)(11, "h1", 8);
      i0.\u0275\u0275text(12, "Lista de tareas");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(13, "p", 9);
      i0.\u0275\u0275text(14, " Gestiona el trabajo pendiente y asignado a cada equipo. ");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(15, "ui-card")(16, "div", 10)(17, "table", 11)(18, "thead", 12)(19, "tr")(20, "th", 13);
      i0.\u0275\u0275text(21, "T\xEDtulo");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(22, "th", 13);
      i0.\u0275\u0275text(23, "Responsable");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(24, "th", 13);
      i0.\u0275\u0275text(25, "Estado");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(26, "th", 13);
      i0.\u0275\u0275text(27, "Vence");
      i0.\u0275\u0275elementEnd()()();
      i0.\u0275\u0275elementStart(28, "tbody", 14);
      i0.\u0275\u0275template(29, RemoteEntryComponent_tr_29_Template, 13, 7, "tr", 15);
      i0.\u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      i0.\u0275\u0275advance(6);
      i0.\u0275\u0275textInterpolate1("", ctx.eventCount, " eventos");
      i0.\u0275\u0275advance(2);
      i0.\u0275\u0275textInterpolate(ctx.sessionStatus);
      i0.\u0275\u0275advance();
      i0.\u0275\u0275property("ngIf", ctx.user);
      i0.\u0275\u0275advance(20);
      i0.\u0275\u0275property("ngForOf", ctx.tasks);
    }
  }, dependencies: [NgClass, NgFor, CommonModule, i2.NgIf, CardComponent, IconComponent], styles: ["\n\n/*# sourceMappingURL=remote-entry.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(RemoteEntryComponent, { className: "RemoteEntryComponent", filePath: "apps/mfe-tasks/src/app/remote-entry/remote-entry.component.ts", lineNumber: 24 });
})();
export {
  RemoteEntryComponent
};
//# sourceMappingURL=Component.js.map
