import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@appshell/ui';

@Component({
  selector: 'app-unauthorized-page',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './unauthorized.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedComponent {}
