import { Component, type ErrorInfo, type ReactNode } from 'react';
interface State {
  failed: boolean;
}
export class AppErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };
  static getDerivedStateFromError(): State {
    return { failed: true };
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    /* Render fallback without exposing internal errors. */
  }
  render() {
    if (this.state.failed)
      return (
        <main className="lf-public-page" role="alert">
          <h1>Halaman tidak dapat ditampilkan</h1>
          <p>Muat ulang halaman untuk memulai sesi demo baru. Data simulasi akan direset.</p>
          <button className="lf-control" type="button" onClick={() => window.location.reload()}>
            Muat ulang
          </button>
        </main>
      );
    return this.props.children;
  }
}
