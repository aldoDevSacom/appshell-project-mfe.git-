import {
  DASHBOARD_ICONS,
  init_dashboard_icons
} from "./chunk-IFCZID4S.js";
import {
  DomSanitizer,
  init_platform_browser
} from "./chunk-WUDFRZA3.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  NgClass,
  NgForOf,
  NgIf,
  ViewChildren,
  __decorate,
  init_common,
  init_core,
  init_tslib_es6,
  signal
} from "./chunk-XVQEXZI5.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:apps/mfe-dashboard/src/app/components/sidebar-menu/sidebar-menu.html
var sidebar_menu_default;
var init_sidebar_menu = __esm({
  "angular:jit:template:apps/mfe-dashboard/src/app/components/sidebar-menu/sidebar-menu.html"() {
    sidebar_menu_default = `<div class="flex w-80 flex-col">
  <div class="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900/70 dark:ring-slate-800">
    <div
      #menuItem
      class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#111418] transition dark:text-slate-200"
      [ngClass]="{ 'active text-white shadow-lg': activeId() === main.id }"
      data-id="{{ main.id }}"
      (click)="onSelect(main, menuItem)">
      <span class="text-[#111418] dark:text-slate-200" [innerHTML]="iconSvg(main.icon)" aria-hidden="true"></span>
      <p>{{ main.label }}</p>
    </div>

    <div *ngFor="let section of sections; trackBy: sectionTrack" class="mt-4 flex flex-col gap-4" [class.pt-4]="section.divider">
      <ng-container *ngIf="section.title as title">
        <h2 class="px-3 text-base font-medium text-[#111418] dark:text-slate-100">{{ title }}</h2>
      </ng-container>

      <div *ngIf="section.divider" class="px-3">
        <hr class="border-slate-200/70 dark:border-slate-700/70" />
      </div>

      <div class="flex flex-col gap-2">
        <div
          *ngFor="let item of section.items; trackBy: itemTrack"
          #menuItem
          class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#111418] transition dark:text-slate-200"
          [ngClass]="{ 'active text-white shadow-lg': activeId() === item.id }"
          data-id="{{ item.id }}"
          (click)="onSelect(item, menuItem)">
          <span class="text-[#111418] dark:text-slate-200" [innerHTML]="iconSvg(item.icon)" aria-hidden="true"></span>
          <p>{{ item.label }}</p>
        </div>
      </div>
    </div>

    <div class="mt-4 flex flex-col gap-1">
      <div
        *ngFor="let item of utilities; trackBy: itemTrack"
        #menuItem
        class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#111418] transition dark:text-slate-200"
        [ngClass]="{ 'active text-white shadow-lg': activeId() === item.id }"
        data-id="{{ item.id }}"
        (click)="onSelect(item, menuItem)">
        <span class="text-[#111418] dark:text-slate-200" [innerHTML]="iconSvg(item.icon)" aria-hidden="true"></span>
        <p>{{ item.label }}</p>
      </div>
    </div>
  </div>
</div>
`;
  }
});

// angular:jit:style:apps/mfe-dashboard/src/app/components/sidebar-menu/sidebar-menu.css
var sidebar_menu_default2;
var init_sidebar_menu2 = __esm({
  "angular:jit:style:apps/mfe-dashboard/src/app/components/sidebar-menu/sidebar-menu.css"() {
    sidebar_menu_default2 = "/* apps/mfe-dashboard/src/app/components/sidebar-menu/sidebar-menu.css */\n/*# sourceMappingURL=sidebar-menu.css.map */\n";
  }
});

// apps/mfe-dashboard/src/app/components/sidebar-menu/sidebar-menu.ts
var SidebarMenu;
var init_sidebar_menu3 = __esm({
  "apps/mfe-dashboard/src/app/components/sidebar-menu/sidebar-menu.ts"() {
    "use strict";
    init_tslib_es6();
    init_sidebar_menu();
    init_sidebar_menu2();
    init_core();
    init_common();
    init_platform_browser();
    init_dashboard_icons();
    SidebarMenu = class SidebarMenu2 {
      sanitizer;
      main;
      sections = [];
      utilities = [];
      menuItems;
      activeId = signal("");
      activeElement;
      iconCache = /* @__PURE__ */ new Map();
      sectionTrack = (_, section) => section.title ?? section.items.map((item) => item.id).join("-");
      itemTrack = (_, item) => item.id;
      constructor(sanitizer) {
        this.sanitizer = sanitizer;
      }
      iconSvg(name) {
        let cached = this.iconCache.get(name);
        if (!cached) {
          cached = this.sanitizer.bypassSecurityTrustHtml(DASHBOARD_ICONS[name]);
          this.iconCache.set(name, cached);
        }
        return cached;
      }
      ngAfterViewInit() {
        setTimeout(() => {
          const initialId = this.main?.id ?? this.sections[0]?.items[0]?.id ?? "";
          this.activeId.set(initialId);
          this.updateActiveElement(initialId);
        }, 0);
      }
      onSelect(item, element) {
        this.activeId.set(item.id);
        this.updateActiveElement(item.id, element);
      }
      onResize() {
        if (this.activeElement) {
          this.applyShift(this.activeElement);
        }
      }
      updateActiveElement(id, element) {
        const host = element ?? this.findElementById(id);
        if (!host) {
          return;
        }
        if (this.activeElement && this.activeElement !== host) {
          this.activeElement.style.setProperty("--active-shift", "0px");
        }
        this.activeElement = host;
        this.applyShift(host);
      }
      findElementById(id) {
        const elements = this.menuItems?.toArray().map((ref) => ref.nativeElement) ?? [];
        return elements.find((el) => el.dataset["id"] === id);
      }
      applyShift(element) {
        const delta = this.computeShift(element);
        element.style.setProperty("--active-shift", `${delta}px`);
      }
      computeShift(container) {
        const rect = container.getBoundingClientRect();
        const children = Array.from(container.children);
        if (!children.length) {
          return 0;
        }
        const left = Math.min(...children.map((child) => child.getBoundingClientRect().left));
        const right = Math.max(...children.map((child) => child.getBoundingClientRect().right));
        const groupWidth = right - left;
        const leftOffset = left - rect.left;
        const desiredLeft = (rect.width - groupWidth) / 2;
        return desiredLeft - leftOffset;
      }
      static ctorParameters = () => [
        { type: DomSanitizer }
      ];
      static propDecorators = {
        main: [{ type: Input, args: [{ required: true }] }],
        sections: [{ type: Input }],
        utilities: [{ type: Input }],
        menuItems: [{ type: ViewChildren, args: ["menuItem", { read: ElementRef }] }],
        onResize: [{ type: HostListener, args: ["window:resize"] }]
      };
    };
    SidebarMenu = __decorate([
      Component({
        selector: "app-sidebar-menu",
        standalone: true,
        imports: [NgClass, NgForOf, NgIf],
        template: sidebar_menu_default,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [sidebar_menu_default2]
      })
    ], SidebarMenu);
  }
});

export {
  SidebarMenu,
  init_sidebar_menu3 as init_sidebar_menu
};
//# sourceMappingURL=chunk-KACOCJMV.js.map
