import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import aboutStyles from '../styles/pages/About.module.css';

export default function About() {
    return (
        <div className={aboutStyles.aboutContainer}>
            <h1 className={aboutStyles.sectionTitle}>About This Project</h1>

            <div className={aboutStyles.projectSection}>
                <h2 className={aboutStyles.sectionHeading}>Task Management Application</h2>
                <p>
                    This application was developed as part of the JdeRobot GSoC 2024 challenge.
                    It's built using React, Redux, and Webpack to provide a comprehensive task management solution.
                </p>

                <h3>Implemented Features:</h3>
                <ul className={aboutStyles.featuresList}>
                    <li><strong>Filtering Tasks:</strong> Users can filter tasks based on completion status (All, Completed, Incomplete).</li>
                    <li><strong>Task Categories:</strong> Tasks can be organized into different categories (Personal, Work, Groceries).</li>
                    <li><strong>Priority Levels:</strong> Each task can be assigned a priority level (High, Medium, Low).</li>
                    <li><strong>Search Functionality:</strong> Users can search for tasks by title using the search bar.</li>
                    <li><strong>User Authentication:</strong> The application includes a secure login system for user-specific task management.</li>
                    <li><strong>Responsive Design:</strong> The interface adapts seamlessly to different screen sizes and devices.</li>
                </ul>

                <h3>Technologies Used:</h3>
                <ul className={aboutStyles.featuresList}>
                    <li><strong>Frontend:</strong> React.js with functional components and hooks</li>
                    <li><strong>State Management:</strong> Redux with middleware for async operations</li>
                    <li><strong>Styling:</strong> CSS Modules for component-scoped styling</li>
                    <li><strong>Build Tools:</strong> Webpack for bundling and optimization</li>
                    <li><strong>Authentication:</strong> JWT-based authentication system ( This was done in the backend Django framework, <a className={aboutStyles.backendLink} href="http://github.com" >backend</a> )</li>
                </ul>
            </div>

            <h1 className={aboutStyles.sectionTitle}>About the Developer</h1>

            <div className={aboutStyles.developerSection}>
                <div className={aboutStyles.subsection}>
                    <h2 className={aboutStyles.sectionHeading}>Destiny Obamwonyi</h2>
                    <p>Computer Engineering student at the University of Benin with extensive experience in web development and software engineering.</p>
                </div>

                <div className={aboutStyles.subsection}>
                    <h3>Professional Experience</h3>
                    <div className={aboutStyles.jobEntry}>
                        <h4 className={aboutStyles.jobTitle}>Software Engineer Intern - Prunedge Technologies</h4>
                        <p className={aboutStyles.jobPeriod}>Jan 2024 - Apr 2024 • Lagos, Nigeria • Hybrid</p>
                        <p>Collaborated with teams to design, develop, and test innovative software solutions using Python, Django, and Django Rest Framework while practicing test-driven development.</p>
                    </div>

                    <div className={aboutStyles.jobEntry}>
                        <h4 className={aboutStyles.jobTitle}>Junior PHP/Laravel Developer - LuTA/Lucrative Tech</h4>
                        <p className={aboutStyles.jobPeriod}>Nov 2022 - May 2023 • Lagos, Nigeria • Remote</p>
                        <p>Built APIs for Flutter and web applications as a backend developer, also handling frontend tasks using Vue.js and Bootstrap5 to create single-page applications when needed.</p>
                    </div>
                </div>

                <div className={aboutStyles.subsection}>
                    <h3>Technical Skills</h3>
                    <div className={aboutStyles.skillsContainer}>
                        {['PHP', 'Python', 'C', 'C++', 'JavaScript', 'Django', 'Laravel', 'React.js', 'Vue.js', 'Git', 'MySQL', 'PostgreSQL', 'Docker'].map(skill => (
                            <span key={skill} className={aboutStyles.skillTag}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={aboutStyles.subsection}>
                    <h3>Contact & Links</h3>
                    <div className={aboutStyles.contactLinks}>
                        <a href="mailto:obamwonyioduwa@gmail.com" className={aboutStyles.contactLink}>
                            <MdEmail /> obamwonyioduwa@gmail.com
                        </a>
                        <a href="https://github.com/obamwonyi" target="_blank" rel="noopener noreferrer" className={aboutStyles.contactLink}>
                            <FaGithub /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/destiny-obamwonyi-3a8a52218/" target="_blank" rel="noopener noreferrer" className={aboutStyles.contactLink}>
                            <FaLinkedin /> LinkedIn
                        </a>
                    </div>
                </div>

                <div className={aboutStyles.subsection}>
                    <h3>Open Source Contributions</h3>
                    <p>Active contributor to projects including Mautic and Wikimedia</p>
                </div>
            </div>
        </div>
    );
}