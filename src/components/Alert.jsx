import React from "react";

export const Alert = (props) => {
  const { message } = props;
  return (
    <div class="mt-3 flex my-auto text-white px-6 py-3 border-0 rounded relative mb-4 bg-red-500">
      <div className="mx-auto">{message}</div>
    </div>
  );
};
