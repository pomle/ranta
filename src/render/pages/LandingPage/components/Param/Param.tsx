import React from "react";
import "./Param.css";

interface ParamProps {
  value: React.ReactNode;
  caption: React.ReactNode;
}

export default function Param({ value, caption }: ParamProps) {
  return (
    <div className="Param">
      <div className="value">{value}</div>
      <div className="caption">{caption}</div>
    </div>
  );
}
