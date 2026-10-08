import { Icon } from './Icon'

export function Toast({ message, onClose }) {
  if (!message) return null
  return <div className="toast" role="status"><span><Icon name="check" size={16} /></span><p>{message}</p><button onClick={onClose} aria-label="Dismiss notification"><Icon name="close" size={15} /></button></div>
}
