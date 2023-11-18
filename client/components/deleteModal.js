

export default function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete Task
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="delete-button"
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-5/12 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={onConfirm}>
              Delete
            </button>
            <button
              id="cancel-button"
              className="px-4 py-2 ml-3 bg-white text-base font-medium rounded-md w-5/12 shadow-sm focus:outline-none focus:ring-2"
              onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
