// frontend/src/components/common/messageBox.js
import React from "react";

function MessageBox({ type, message }) {
  let bgColor = "";
  let textColor = "";
  const icon = null; // You might add icons based on type later

  switch (type) {
    case "success":
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      // icon = <CheckCircle className="w-5 h-5" />; // Example with Lucide React
      break;
    case "error":
      bgColor = "bg-red-100";
      textColor = "text-red-700";
      // icon = <XCircle className="w-5 h-5" />;
      break;
    case "info":
    default:
      bgColor = "bg-blue-100";
      textColor = "text-blue-700";
      // icon = <Info className="w-5 h-5" />;
      break;
  }

  if (!message) {
    return null; // Don't render if no message
  }

  return (
    <div className={`p-3 rounded-md flex items-center ${bgColor} ${textColor}`}>
      {icon && <div className="mr-2">{icon}</div>}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default MessageBox;
