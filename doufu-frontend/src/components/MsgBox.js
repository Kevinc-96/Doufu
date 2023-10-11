import Alert from 'react-bootstrap/Alert';

function MsgBox(params) {
  return <Alert variant={params.variant || 'info'}>{params.children}</Alert>;
}
export default MsgBox;
