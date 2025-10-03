import {
  DashboardContentComponent,
  init_dashboard_content
} from "./chunk-5RV4LAQQ.js";
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

// apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.spec.ts
var require_dashboard_content_spec = __commonJS({
  "apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.spec.ts"(exports) {
    init_testing();
    init_dashboard_content();
    describe("DashboardContentComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [DashboardContentComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DashboardContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("renders the dashboard title", () => {
        const heading = fixture.nativeElement.querySelector("p");
        expect(heading?.textContent).toContain("Dashboard");
      });
    });
  }
});
export default require_dashboard_content_spec();
//# sourceMappingURL=spec-app-components-dashboard-content-dashboard-content.spec.js.map
