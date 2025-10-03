import {
  DashboardLayout,
  init_dashboard_layout
} from "./chunk-HXL5BTOF.js";
import "./chunk-5RV4LAQQ.js";
import "./chunk-PDAPZAY3.js";
import "./chunk-PGTZUGMP.js";
import {
  ChangeDetectionStrategy,
  Component,
  TestBed,
  __decorate,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-2I7XQ46T.js";
import {
  __async,
  __commonJS,
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.html
var remote_entry_component_default;
var init_remote_entry_component = __esm({
  "angular:jit:template:apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.html"() {
    remote_entry_component_default = "<app-dashboard-layout></app-dashboard-layout>\n";
  }
});

// angular:jit:style:apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.css
var remote_entry_component_default2;
var init_remote_entry_component2 = __esm({
  "angular:jit:style:apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.css"() {
    remote_entry_component_default2 = "/* apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.css */\n/*# sourceMappingURL=remote-entry.component.css.map */\n";
  }
});

// apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts
var RemoteEntryComponent;
var init_remote_entry_component3 = __esm({
  "apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_remote_entry_component();
    init_remote_entry_component2();
    init_core();
    init_dashboard_layout();
    RemoteEntryComponent = class RemoteEntryComponent2 {
    };
    RemoteEntryComponent = __decorate([
      Component({
        selector: "mfe-dashboard-entry",
        standalone: true,
        imports: [DashboardLayout],
        template: remote_entry_component_default,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [remote_entry_component_default2]
      })
    ], RemoteEntryComponent);
  }
});

// apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.spec.ts
var require_remote_entry_component_spec = __commonJS({
  "apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.spec.ts"(exports) {
    init_testing();
    init_remote_entry_component3();
    describe("RemoteEntryComponent (Dashboard)", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [RemoteEntryComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(RemoteEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("renders the dashboard title", () => {
        const textContent = fixture.nativeElement.textContent ?? "";
        expect(textContent).toContain("Dashboard");
      });
    });
  }
});
export default require_remote_entry_component_spec();
//# sourceMappingURL=spec-app-remote-entry-remote-entry.component.spec.js.map
