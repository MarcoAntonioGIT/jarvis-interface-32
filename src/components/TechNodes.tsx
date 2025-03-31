
import React, { useEffect, useRef } from 'react';
import { Circuit, Zap } from 'lucide-react';

const TechNodes = () => {
  const nodesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create nodes dynamically
    if (nodesRef.current) {
      const container = nodesRef.current;
      const containerRect = container.getBoundingClientRect();
      
      // Clear any existing nodes first
      container.innerHTML = '';
      
      // Create 15 tech nodes
      for (let i = 0; i < 15; i++) {
        const node = document.createElement('div');
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        // Random size (scale)
        const scale = 0.5 + Math.random() * 1.5;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        // Random node type
        const nodeType = Math.random() > 0.5 ? 'circuit' : 'zap';
        
        node.className = `absolute tech-node ${nodeType} animate-pulse-glow`;
        node.style.left = `${left}%`;
        node.style.top = `${top}%`;
        node.style.transform = `scale(${scale})`;
        node.style.animationDelay = `${delay}s`;
        
        // Add SVG icon
        if (nodeType === 'circuit') {
          node.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circuit-board"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M11 9h4a2 2 0 0 0 2-2V3"/><circle cx="9" cy="9" r="2"/><path d="M7 21v-4a2 2 0 0 1 2-2h4"/><circle cx="15" cy="15" r="2"/></svg>`;
        } else {
          node.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
        }
        
        container.appendChild(node);
      }
    }
  }, []);
  
  return (
    <div ref={nodesRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {/* Tech nodes will be created dynamically here */}
    </div>
  );
};

export default TechNodes;
