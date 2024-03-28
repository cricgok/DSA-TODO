import React from 'react';
import './Status.css'; // Import the custom CSS file

function Status({ visi }) {
    return (
        <div className={`${visi ? 'status-container.visible' : 'status-container'}`}>
            <p className="status-title">Tips to Solve Problems:</p>
            <ul className="status-list">
                <li>Understand the problem statement thoroughly.</li>
                <li>Break down the problem into smaller parts.</li>
                <li>Identify the key data structures and algorithms needed.</li>
                <li>Implement a logical solution step by step.</li>
                <li>Test your solution with sample inputs and edge cases.</li>
            </ul>
        </div>
    );
}

export default Status;
