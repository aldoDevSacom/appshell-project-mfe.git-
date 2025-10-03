import {
  OrdersTable,
  init_orders_table
} from "./chunk-4CNQZCCT.js";
import {
  TestBed,
  init_testing
} from "./chunk-XVQEXZI5.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// apps/mfe-dashboard/src/app/components/orders-table/orders-table.spec.ts
var require_orders_table_spec = __commonJS({
  "apps/mfe-dashboard/src/app/components/orders-table/orders-table.spec.ts"(exports) {
    init_testing();
    init_orders_table();
    describe("OrdersTable", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [OrdersTable]
        }).compileComponents();
        fixture = TestBed.createComponent(OrdersTable);
        component = fixture.componentInstance;
        component.orders = [{ customer: "Cliente", status: "Iniciada", statusVariant: "gradient", folio: "#1", date: "01-01-2025" }];
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_orders_table_spec();
//# sourceMappingURL=spec-app-components-orders-table-orders-table.spec.js.map
