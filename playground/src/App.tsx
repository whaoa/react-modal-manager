import { ModalPlacement } from '@whaoa/react-modal-manager';

import { mm } from './modals/mm';
import { MuiDialogView } from './modals/mui';
import { AntdControlledModalView, AntdModalView } from './modals/antd';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>React Modal Manager Playground</h1>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <MuiDialogView />
        <AntdModalView />
        <AntdControlledModalView />
      </div>

      <div>
        <ModalPlacement modalManager={mm} />
      </div>
    </div>
  );
}

export default App;
