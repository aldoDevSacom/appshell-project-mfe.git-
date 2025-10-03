import {
  DashboardLayout,
  init_dashboard_layout
} from "./chunk-HXL5BTOF.js";
import "./chunk-5RV4LAQQ.js";
import "./chunk-PDAPZAY3.js";
import "./chunk-PGTZUGMP.js";
import {
  TestBed,
  init_testing
} from "./chunk-2I7XQ46T.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.spec.ts
var require_dashboard_layout_spec = __commonJS({
  "apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.spec.ts"(exports) {
    init_testing();
    init_dashboard_layout();
    describe("DashboardLayout", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [DashboardLayout]
        }).compileComponents();
        fixture = TestBed.createComponent(DashboardLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_dashboard_layout_spec();
//# sourceMappingURL=spec-app-components-dashboard-layout-dashboard-layout.spec.js.map
