import ReactDOM  from 'react-dom';

const Backdrop = props =>{
return <div className='backdrop'></div>
}

const ModalOverlay = props =>{
return <div className='modal-overlay'>
    <div>{props.children}</div>
</div>
}

const Modal = props =>{
    const portalElement = document.getElementById('overlays')
    return (
        <>
            {ReactDOM.createPortal(<Backdrop/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default Modal;