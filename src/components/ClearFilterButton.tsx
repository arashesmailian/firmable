import React from "react";

type Props = {
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
  text: string;
};

export const ClearFilterButton: React.FC<Props> = ({
  onClick,
  className,
  icon,
  text,
}) => {
  return (
    <button onClick={onClick} className={className}>
      {icon}
      {text}
    </button>
  );
};
