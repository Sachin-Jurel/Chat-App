import React from "react";
import { Search, Phone, MoreVertical } from "lucide-react";
import UseConversation from "../../Manage/UseConversation";

const RightPanelHeader = () => {
  const {selectedConversation} = UseConversation();
  return (
    <div
      className="
        w-full px-4 py-3 border-b fixed flex items-center justify-between
        bg-white border-gray-200
        dark:bg-slate-900 dark:border-slate-800
      "
    >
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-3">
        <img
          src={ selectedConversation?.avatar || "https://i.pravatar.cc/150?img=3"}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            { selectedConversation?.name || "Loading..." }
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Online
          </p>
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 text-gray-700 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white" />
        <Phone className="w-5 h-5 text-gray-700 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white" />
        <MoreVertical className="w-5 h-5 text-gray-700 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white" />
      </div>
    </div>
  );
};

export default RightPanelHeader;
