import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import teamData from './teamData.json';

import './CardGroup.css';

export default function CardGroup({ group }) {
  const [imagesUrl, setImagesUrl] = useState('');

  useEffect(() => {
    async function loadProfileImages() {
      const imagesUrlPromises = await Promise.all(
        teamData.map(async (member) => {
          const url = await import(
            `../../../images/profile-pics/${member.imgName}.jpg`
          );
          return url.default;
        })
      );

      setImagesUrl(imagesUrlPromises);
    }

    loadProfileImages();
  }, []);

  return (
    <div className="cards">
      {teamData.map(
        (member, index) =>
          member.group === group && (
            <div key={member.name} className="card">
              <div className="wrapper">
                <img
                  className="profile-pic"
                  src={imagesUrl[index]}
                  alt="profile-pic"
                />
                <div className="info">
                  <h3 className="name">{member.name}</h3>
                  <p className="role">{member.role}</p>
                </div>
              </div>
              <p className="status">{member.status}</p>
              <div className="portfolio">
                <a
                  className="primary"
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={20} />
                  GitHub
                </a>
                <a
                  className="primary"
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={20} />
                  Linkedin
                </a>
              </div>
            </div>
          )
      )}
    </div>
  );
}
