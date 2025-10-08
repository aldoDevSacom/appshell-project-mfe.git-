import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@appshell/ui';

@Component({
  selector: 'mfe-billing-entry',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './remote-entry.html',
  styleUrl: './remote-entry.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {
  protected readonly invoices = [
    { id: 'INV-001', customer: 'MALLAS ORIÓN', amount: '$1,250.00', status: 'Paid', date: '2025-01-15' },
    { id: 'INV-002', customer: 'FUMICOUNTRY AMBIENTAL', amount: '$890.50', status: 'Pending', date: '2025-01-20' },
    { id: 'INV-003', customer: 'GRÚAS ECONÓMICAS DELTA', amount: '$2,100.00', status: 'Overdue', date: '2025-01-10' },
  ];
}
