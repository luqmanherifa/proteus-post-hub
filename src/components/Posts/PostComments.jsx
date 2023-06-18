import React from "react";

const PostComments = ({ comments }) => {
  return (
    <div>
      {comments.length > 0 && (
        <div>
          {comments.map((comment, index) => (
            <div key={comment.id} className="mb-3">
              <div className="bg-white max-w-xs lg:max-w-3xl mx-auto border border-slate-300 rounded-xl p-5">
                <div className="flex items-center mb-3 space-x-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={`https://source.unsplash.com/200x200?landscape&${
                      Date.now() + index
                    }`}
                    alt=""
                  />
                  <div className="space-y-1 font-medium text-slate-600">
                    <p>{comment.name}</p>
                    <div className="flex items-center text-sm text-slate-500">
                      {comment.email}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 mt-6 md:mt-0">
                  <p className="mb-2 text-slate-500">{comment.body}</p>
                  <aside className="flex items-center mt-3 space-x-5">
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-sky-500 hover:underline"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 mr-1.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                      </svg>
                      Helpful
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-sky-500 hover:underline group"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 mr-1.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"></path>
                      </svg>
                      Not helpful
                    </a>
                  </aside>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostComments;
