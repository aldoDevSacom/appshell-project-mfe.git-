// apps/mfe-marketing/src/app/remote-entry/remote-entry.component.ts
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NgFor, CommonModule } from "@angular/common";
import { CardComponent, IconComponent } from "@appshell/ui";
import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@app/session-service";
import * as i2 from "@angular/common";
function RemoteEntryComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "div", 12);
    i0.\u0275\u0275text(1);
    i0.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i0.\u0275\u0275nextContext();
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate2(" Usuario: ", ctx_r0.user.displayName, " | Email: ", ctx_r0.user.email, " ");
  }
}
function RemoteEntryComponent_ui_card_16_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "ui-card", 13)(1, "div", 14)(2, "div", 15);
    i0.\u0275\u0275element(3, "ui-icon", 16);
    i0.\u0275\u0275text(4, " CTR: ");
    i0.\u0275\u0275elementStart(5, "strong", 17);
    i0.\u0275\u0275text(6);
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(7, "div", 15);
    i0.\u0275\u0275element(8, "ui-icon", 18);
    i0.\u0275\u0275text(9, " CPA: ");
    i0.\u0275\u0275elementStart(10, "strong", 17);
    i0.\u0275\u0275text(11);
    i0.\u0275\u0275elementEnd()()();
    i0.\u0275\u0275elementStart(12, "p", 19);
    i0.\u0275\u0275element(13, "ui-icon", 20);
    i0.\u0275\u0275text(14);
    i0.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const campaign_r2 = ctx.$implicit;
    i0.\u0275\u0275property("title", campaign_r2.name)("subtitle", campaign_r2.channel);
    i0.\u0275\u0275advance(6);
    i0.\u0275\u0275textInterpolate(campaign_r2.ctr);
    i0.\u0275\u0275advance(5);
    i0.\u0275\u0275textInterpolate(campaign_r2.cpa);
    i0.\u0275\u0275advance(3);
    i0.\u0275\u0275textInterpolate1(" ", campaign_r2.status, " ");
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
  campaigns = [
    { name: "Lanzamiento Q3 SaaS", channel: "LinkedIn Ads", ctr: "3.2%", cpa: "$18", status: "Activa" },
    { name: "Retenci\xF3n clientes", channel: "Email Automation", ctr: "4.9%", cpa: "$8", status: "Programada" },
    { name: "Campa\xF1a SEO contenidos", channel: "Blog + PR", ctr: "2.1%", cpa: "$12", status: "Activa" },
    { name: "Upsell product tour", channel: "In-app Messages", ctr: "5.4%", cpa: "$6", status: "Pausada" }
  ];
  constructor(sessionService) {
    this.sessionService = sessionService;
    console.log("[MFE-Marketing] Component initialized");
    this.loadSessionData();
  }
  ngOnInit() {
    console.log("[MFE-Marketing] OnInit - Setting up session monitoring");
    this.setupSessionSubscription();
  }
  ngOnDestroy() {
    console.log("[MFE-Marketing] OnDestroy - Cleaning up subscriptions");
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
      console.log("[MFE-Marketing] Session loaded:", {
        authenticated: this.isAuthenticated,
        user: this.user?.displayName,
        status: this.sessionStatus
      });
    } catch (error) {
      console.error("[MFE-Marketing] Error loading session:", error);
      this.sessionStatus = "\u26A0\uFE0F Error en sesi\xF3n";
    }
  }
  setupSessionSubscription() {
    if (this.sessionService) {
      this.subscription.add(this.sessionService.onSessionChange().subscribe((event) => {
        this.eventCount++;
        console.log("[MFE-Marketing] Session event received:", event.type, event);
        this.loadSessionData();
      }));
    }
  }
  static \u0275fac = function RemoteEntryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RemoteEntryComponent)(i0.\u0275\u0275directiveInject(i1.SessionService));
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _RemoteEntryComponent, selectors: [["mfe-marketing-entry"]], decls: 17, vars: 4, consts: [[1, "space-y-6"], [1, "bg-orange-50", "dark:bg-orange-950", "border", "border-orange-200", "dark:border-orange-800", "rounded-lg", "p-4", "text-sm"], [1, "flex", "items-center", "justify-between"], [1, "font-medium", "text-orange-900", "dark:text-orange-100"], [1, "text-xs", "bg-orange-100", "dark:bg-orange-900", "px-2", "py-1", "rounded"], [1, "text-orange-700", "dark:text-orange-300", "mt-1"], ["class", "text-xs text-orange-600 dark:text-orange-400 mt-2", 4, "ngIf"], [1, "flex", "flex-col", "gap-2"], [1, "text-2xl", "font-semibold", "text-slate-900", "dark:text-white"], [1, "text-sm", "text-slate-500", "dark:text-slate-300"], [1, "grid", "gap-4", "lg:grid-cols-2"], [3, "title", "subtitle", 4, "ngFor", "ngForOf"], [1, "text-xs", "text-orange-600", "dark:text-orange-400", "mt-2"], [3, "title", "subtitle"], [1, "flex", "items-center", "justify-between", "text-sm"], [1, "flex", "items-center", "gap-2", "text-slate-500", "dark:text-slate-300"], ["name", "bolt", "size", "sm"], [1, "text-slate-900", "dark:text-white"], ["name", "paid", "size", "sm"], [1, "mt-4", "inline-flex", "items-center", "gap-2", "rounded-full", "bg-blue-50", "px-3", "py-1", "text-xs", "font-medium", "text-blue-600", "dark:bg-blue-500/20", "dark:text-blue-200"], ["name", "play_circle", "size", "sm"]], template: function RemoteEntryComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      i0.\u0275\u0275text(4, "\u{1F4CA} MFE Marketing - Estado de Sesi\xF3n Compartida");
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
      i0.\u0275\u0275text(12, "Marketing");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(13, "p", 9);
      i0.\u0275\u0275text(14, " Monitoriza campa\xF1as y su desempe\xF1o en tiempo real. ");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(15, "div", 10);
      i0.\u0275\u0275template(16, RemoteEntryComponent_ui_card_16_Template, 15, 5, "ui-card", 11);
      i0.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      i0.\u0275\u0275advance(6);
      i0.\u0275\u0275textInterpolate1("", ctx.eventCount, " eventos");
      i0.\u0275\u0275advance(2);
      i0.\u0275\u0275textInterpolate(ctx.sessionStatus);
      i0.\u0275\u0275advance();
      i0.\u0275\u0275property("ngIf", ctx.user);
      i0.\u0275\u0275advance(7);
      i0.\u0275\u0275property("ngForOf", ctx.campaigns);
    }
  }, dependencies: [NgFor, CommonModule, i2.NgIf, CardComponent, IconComponent], styles: ["\n\n/*# sourceMappingURL=remote-entry.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(RemoteEntryComponent, { className: "RemoteEntryComponent", filePath: "apps/mfe-marketing/src/app/remote-entry/remote-entry.component.ts", lineNumber: 23 });
})();
export {
  RemoteEntryComponent
};
//# sourceMappingURL=Component.js.map
