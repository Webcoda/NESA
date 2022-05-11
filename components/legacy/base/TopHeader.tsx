import React from 'react';

export interface TopHeaderProps {}

export default function TopHeader(props: TopHeaderProps) {
  return (
    <div className="top-header-container">
      <div className="top-header nsw-container">
        <p aria-label="A NSW Government website">A NSW Government website</p>
      </div>
    </div>
  );
}
