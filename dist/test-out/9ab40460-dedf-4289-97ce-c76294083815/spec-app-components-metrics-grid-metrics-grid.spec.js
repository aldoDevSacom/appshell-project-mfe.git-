import {
  MetricsGrid,
  init_metrics_grid
} from "./chunk-WW6PLZ2I.js";
import {
  TestBed,
  init_testing
} from "./chunk-XVQEXZI5.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.spec.ts
var require_metrics_grid_spec = __commonJS({
  "apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.spec.ts"(exports) {
    init_testing();
    init_metrics_grid();
    describe("MetricsGrid", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [MetricsGrid]
        }).compileComponents();
        fixture = TestBed.createComponent(MetricsGrid);
        component = fixture.componentInstance;
        component.metrics = [{ title: "Test", value: "1", trend: "+1%", trendColor: "positive" }];
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_metrics_grid_spec();
//# sourceMappingURL=spec-app-components-metrics-grid-metrics-grid.spec.js.map
