import { useRef } from 'react';
import './post.css';

const PostActionModal = ({ action, onCancel, onConfirm, post }) => {
  const modalRef = useRef();
  const descriptionRef = useRef();

  const handleModalClose = (e) => {
    if (!modalRef.current.contains(e.target)) onCancel();
  };

  return (
    <div className='modal-container' onClick={handleModalClose}>
      <div className='modal' ref={modalRef}>
        <div className='modal-header'>
          <h3>
            {action === 'UPDATE'
              ? 'Update'
              : 'Are you sure you want to delete this post?'}
          </h3>
          {action === 'UPDATE' && (
            <textarea
              className='form-control textarea'
              name='desc'
              id='desc'
              ref={descriptionRef}
              defaultValue={post.desc}
            ></textarea>
          )}

          <div className='btn-group'>
            <button className='btn' onClick={onCancel}>
              cancel
            </button>
            {action === 'UPDATE' ? (
              <button
                className='btn btn-danger'
                onClick={() => onConfirm(descriptionRef.current.value)}
              >
                {action}
              </button>
            ) : (
              <button className='btn btn-danger' onClick={onConfirm}>
                {action}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostActionModal;
