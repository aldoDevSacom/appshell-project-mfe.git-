import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@appshell/ui';

@Component({
  selector: 'app-access-denied-page',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './access-denied.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessDeniedComponent {}
