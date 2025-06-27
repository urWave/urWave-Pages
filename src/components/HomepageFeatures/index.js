import React, { useState } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { motion } from 'framer-motion'; 

const FeatureList = [
  {
    title: '.NET Development',
    Svg: require('@site/static/img/dotnet.svg').default,
    description: 'Our team specializes in .NET development, delivering robust and scalable applications tailored to your business needs.',
    technologies: ['.NET Core', 'C#', 'ASP.NET', 'Entity Framework'],
    color: 'purple'
  },
  {
    title: 'Angular Expertise',
    Svg: require('@site/static/img/angular.svg').default,
    description: 'We leverage Angular to build dynamic and responsive web applications, ensuring a seamless user experience.',
    technologies: ['TypeScript', 'RxJS', 'NgRx', 'Angular Material'],
    color: 'red'
  },
  {
    title: 'Web Application Solutions',
    Svg: require('@site/static/img/solutions.svg').default,
    description: 'From concept to deployment, we provide end-to-end web application solutions, utilizing the latest technologies and best practices.',
    technologies: ['Angular', '.Net Core', 'Cloud Deployment'],
    color: 'blue'
  },
];

function Feature({Svg, title, description, technologies, color}) {
  const [isHovered, setIsHovered] = useState(false);

  // Map color to specific CSS class
  const colorClassMap = {
    'purple': styles.textPurple,
    'red': styles.textRed,
    'blue': styles.textBlue
  };

  return (
    <motion.div 
      className={clsx('col col--4', styles.featureCard)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading 
          as="h3" 
          className={colorClassMap[color] || ''}
        >
          {title}
        </Heading>
        <p>{description}</p>
        
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.technologiesOverlay}
          >
            <div className={styles.technologiesList}>
              {technologies.map((tech, index) => (
                <span key={index} className={styles.techBadge}>{tech}</span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}