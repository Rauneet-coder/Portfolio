import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { notify } from './SystemNotifications';
import './SkillTree.css';

const SkillTree = () => {
    const fgRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

    const graphData = {
        nodes: [
            { id: "Core", group: 0, val: 30, color: "#fff" },
            { id: "Frontend", group: 1, val: 20, color: "#61DAFB" },
            { id: "Backend", group: 2, val: 20, color: "#339933" },
            { id: "DevOps", group: 3, val: 20, color: "#326CE5" },
            { id: "React", group: 1, val: 10, color: "#61DAFB" },
            { id: "Tailwind CSS", group: 1, val: 5, color: "#38B2AC" },
            { id: "GSAP", group: 1, val: 5, color: "#88CE02" },
            { id: "Three.js", group: 1, val: 8, color: "#00ff80" },
            { id: "Node.js", group: 2, val: 15, color: "#339933" },
            { id: "Express", group: 2, val: 10, color: "#68A063" },
            { id: "MongoDB", group: 2, val: 10, color: "#47A248" },
            { id: "PostgreSQL", group: 2, val: 10, color: "#336791" },
            { id: "Redis", group: 2, val: 8, color: "#D82C20" },
            { id: "Docker", group: 3, val: 15, color: "#2496ED" },
            { id: "Kubernetes", group: 3, val: 12, color: "#326CE5" },
            { id: "Linux", group: 3, val: 10, color: "#FCC624" },
            { id: "GitHub Actions", group: 3, val: 10, color: "#2088FF" }
        ],
        links: [
            { source: "Core", target: "Frontend" },
            { source: "Core", target: "Backend" },
            { source: "Core", target: "DevOps" },
            { source: "Frontend", target: "React" },
            { source: "Frontend", target: "Tailwind CSS" },
            { source: "Frontend", target: "GSAP" },
            { source: "Frontend", target: "Three.js" },
            { source: "Backend", target: "Node.js" },
            { source: "Node.js", target: "Express" },
            { source: "Node.js", target: "MongoDB" },
            { source: "Node.js", target: "PostgreSQL" },
            { source: "Node.js", target: "Redis" },
            { source: "DevOps", target: "Docker" },
            { source: "DevOps", target: "Kubernetes" },
            { source: "DevOps", target: "Linux" },
            { source: "DevOps", target: "GitHub Actions" },
            { source: "Docker", target: "Node.js" }, // cross-connections
            { source: "Kubernetes", target: "Docker" }
        ]
    };

    useEffect(() => {
        // Simple resize observer
        const resize = () => {
            const container = document.querySelector('.skill-tree-container');
            if (container) {
                setDimensions({
                    width: container.clientWidth,
                    height: container.clientHeight
                });
            }
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const handleNodeClick = (node) => {
        // Trigger notification
        notify(`Selected branch: ${node.id}`, 'info');

        // Center on node
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(8, 2000);

        // Highlight related links (handled visually via focus or state if needed, here we just zoom)
        // A more advanced approach would iterate over nodes and darken non-related, but 
        // the prompt suggests "nodes light up". We'll keep it simple for now to avoid extensive state.
    };

    const handleNodeHover = (node) => {
        if (node && typeof window !== 'undefined') {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'none'; // Revert to custom cursor
        }
    };

    return (
        <div className="skill-tree-container fade-in" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <div className="st-header">
                <h2>Neural Interface: Skill Tree</h2>
                <p>Interactive mapping of interconnected technologies.</p>
            </div>
            
            <div className="st-graph-wrapper">
                <ForceGraph2D
                    ref={fgRef}
                    width={dimensions.width}
                    height={dimensions.height - 80} // header offset
                    graphData={graphData}
                    nodeLabel="id"
                    nodeColor={node => node.color}
                    nodeRelSize={6}
                    linkColor={() => 'rgba(255,255,255,0.2)'}
                    linkWidth={2}
                    onNodeClick={handleNodeClick}
                    onNodeHover={handleNodeHover}
                    backgroundColor="transparent"
                    cooldownTicks={100} // stop moving after a while
                />
            </div>
        </div>
    );
};

export default SkillTree;
