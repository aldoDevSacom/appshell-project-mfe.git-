// apps/mfe-iam/src/app/remote-entry/remote-entry.component.ts
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NgFor, CommonModule } from "@angular/common";
import { CardComponent, IconComponent } from "@appshell/ui";
import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@app/session-service";
import * as i2 from "@angular/common";
function RemoteEntryComponent_div_9_div_2_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "div", 15);
    i0.\u0275\u0275text(1);
    i0.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i0.\u0275\u0275nextContext(2);
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate1(" Roles: ", ctx_r0.userRoles.join(", "), " ");
  }
}
function RemoteEntryComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "div", 13);
    i0.\u0275\u0275text(1);
    i0.\u0275\u0275template(2, RemoteEntryComponent_div_9_div_2_Template, 2, 1, "div", 14);
    i0.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i0.\u0275\u0275nextContext();
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate2(" Usuario: ", ctx_r0.user.displayName, " | Email: ", ctx_r0.user.email, " ");
    i0.\u0275\u0275advance();
    i0.\u0275\u0275property("ngIf", ctx_r0.userRoles.length > 0);
  }
}
function RemoteEntryComponent_li_17_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "li", 16)(1, "div", 17)(2, "span", 18);
    i0.\u0275\u0275element(3, "ui-icon", 19);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(4, "div")(5, "p", 20);
    i0.\u0275\u0275text(6);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(7, "p", 21);
    i0.\u0275\u0275text(8);
    i0.\u0275\u0275elementEnd()()();
    i0.\u0275\u0275elementStart(9, "div", 17)(10, "span", 22);
    i0.\u0275\u0275element(11, "ui-icon", 23);
    i0.\u0275\u0275text(12);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(13, "span", 24);
    i0.\u0275\u0275element(14, "ui-icon", 25);
    i0.\u0275\u0275text(15);
    i0.\u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const member_r2 = ctx.$implicit;
    i0.\u0275\u0275advance(6);
    i0.\u0275\u0275textInterpolate(member_r2.name);
    i0.\u0275\u0275advance(2);
    i0.\u0275\u0275textInterpolate(member_r2.email);
    i0.\u0275\u0275advance(4);
    i0.\u0275\u0275textInterpolate1(" ", member_r2.role, " ");
    i0.\u0275\u0275advance(2);
    i0.\u0275\u0275property("name", member_r2.status === "Activo" ? "verified" : "pending");
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate1(" ", member_r2.status, " ");
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
  userRoles = [];
  members = [
    { name: "Sandra P\xE1ez", email: "sandra.paez@example.com", role: "Administrador", status: "Activo" },
    { name: "Marco C\xE1rdenas", email: "marco.cardenas@example.com", role: "Auditor", status: "Activo" },
    { name: "Ingrid Flores", email: "ingrid.flores@example.com", role: "Soporte", status: "Invitado" },
    { name: "David Pino", email: "david.pino@example.com", role: "Marketing", status: "Activo" }
  ];
  constructor(sessionService) {
    this.sessionService = sessionService;
    console.log("[MFE-IAM] Component initialized");
    this.loadSessionData();
  }
  ngOnInit() {
    console.log("[MFE-IAM] OnInit - Setting up session monitoring");
    this.setupSessionSubscription();
  }
  ngOnDestroy() {
    console.log("[MFE-IAM] OnDestroy - Cleaning up subscriptions");
    this.subscription.unsubscribe();
  }
  loadSessionData() {
    try {
      this.isAuthenticated = this.sessionService?.isAuthenticated() ?? false;
      this.user = this.sessionService?.getUser() ?? null;
      this.userRoles = this.sessionService?.getRoles() ?? [];
      if (this.isAuthenticated && this.user) {
        this.sessionStatus = `\u2705 Sesi\xF3n activa - ${this.user.displayName}`;
      } else {
        this.sessionStatus = "\u274C Sin sesi\xF3n activa";
      }
      console.log("[MFE-IAM] Session loaded:", {
        authenticated: this.isAuthenticated,
        user: this.user?.displayName,
        roles: this.userRoles,
        status: this.sessionStatus
      });
    } catch (error) {
      console.error("[MFE-IAM] Error loading session:", error);
      this.sessionStatus = "\u26A0\uFE0F Error en sesi\xF3n";
    }
  }
  setupSessionSubscription() {
    if (this.sessionService) {
      this.subscription.add(this.sessionService.onSessionChange().subscribe((event) => {
        this.eventCount++;
        console.log("[MFE-IAM] Session event received:", event.type, event);
        this.loadSessionData();
      }));
    }
  }
  static \u0275fac = function RemoteEntryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RemoteEntryComponent)(i0.\u0275\u0275directiveInject(i1.SessionService));
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _RemoteEntryComponent, selectors: [["mfe-iam-entry"]], decls: 18, vars: 4, consts: [[1, "space-y-6"], [1, "bg-purple-50", "dark:bg-purple-950", "border", "border-purple-200", "dark:border-purple-800", "rounded-lg", "p-4", "text-sm"], [1, "flex", "items-center", "justify-between"], [1, "font-medium", "text-purple-900", "dark:text-purple-100"], [1, "text-xs", "bg-purple-100", "dark:bg-purple-900", "px-2", "py-1", "rounded"], [1, "text-purple-700", "dark:text-purple-300", "mt-1"], ["class", "text-xs text-purple-600 dark:text-purple-400 mt-2", 4, "ngIf"], [1, "flex", "flex-col", "gap-2"], [1, "text-2xl", "font-semibold", "text-slate-900", "dark:text-white"], [1, "text-sm", "text-slate-500", "dark:text-slate-300"], ["title", "Miembros", "subtitle", "4 roles activos"], [1, "divide-y", "divide-slate-200", "dark:divide-slate-700"], ["class", "flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between", 4, "ngFor", "ngForOf"], [1, "text-xs", "text-purple-600", "dark:text-purple-400", "mt-2"], ["class", "mt-1", 4, "ngIf"], [1, "mt-1"], [1, "flex", "flex-col", "gap-3", "py-3", "md:flex-row", "md:items-center", "md:justify-between"], [1, "flex", "items-center", "gap-3"], [1, "flex", "h-10", "w-10", "items-center", "justify-center", "rounded-full", "bg-indigo-100", "text-indigo-600", "dark:bg-indigo-500/20", "dark:text-indigo-200"], ["name", "person", "size", "sm"], [1, "font-medium", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-300"], [1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-slate-100", "px-3", "py-1", "text-xs", "font-medium", "text-slate-600", "dark:bg-slate-800", "dark:text-slate-200"], ["name", "workspace_premium", "size", "sm"], [1, "text-xs", "text-slate-400"], ["size", "sm", 3, "name"]], template: function RemoteEntryComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      i0.\u0275\u0275text(4, "\u{1F510} MFE IAM - Estado de Sesi\xF3n Compartida");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(5, "span", 4);
      i0.\u0275\u0275text(6);
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(7, "p", 5);
      i0.\u0275\u0275text(8);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275template(9, RemoteEntryComponent_div_9_Template, 3, 3, "div", 6);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(10, "header", 7)(11, "h1", 8);
      i0.\u0275\u0275text(12, "Identity & Access");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(13, "p", 9);
      i0.\u0275\u0275text(14, " Controla roles, accesos y estados de las cuentas. ");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(15, "ui-card", 10)(16, "ul", 11);
      i0.\u0275\u0275template(17, RemoteEntryComponent_li_17_Template, 16, 5, "li", 12);
      i0.\u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      i0.\u0275\u0275advance(6);
      i0.\u0275\u0275textInterpolate1("", ctx.eventCount, " eventos");
      i0.\u0275\u0275advance(2);
      i0.\u0275\u0275textInterpolate(ctx.sessionStatus);
      i0.\u0275\u0275advance();
      i0.\u0275\u0275property("ngIf", ctx.user);
      i0.\u0275\u0275advance(8);
      i0.\u0275\u0275property("ngForOf", ctx.members);
    }
  }, dependencies: [NgFor, CommonModule, i2.NgIf, CardComponent, IconComponent], styles: ["\n\n/*# sourceMappingURL=remote-entry.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(RemoteEntryComponent, { className: "RemoteEntryComponent", filePath: "apps/mfe-iam/src/app/remote-entry/remote-entry.component.ts", lineNumber: 22 });
})();
export {
  RemoteEntryComponent
};
//# sourceMappingURL=Component.js.map
