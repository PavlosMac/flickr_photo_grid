import { Spectator, createComponentFactory } from '@ngneat/spectator';
import {InfiniteScrollComponent} from './infinite-scroll.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<InfiniteScrollComponent>;
  const createComponent = createComponentFactory(InfiniteScrollComponent);

  beforeEach(() => spectator = createComponent());

  it('should have a success class by default', () => {
    expect(spectator.query('button')).toHaveClass('success');
  });
});
