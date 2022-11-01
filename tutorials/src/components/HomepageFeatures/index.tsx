import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image?: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Hands-On Learning',
    image: require('@site/static/img/hands-on-learning.png').default,
    description: (
      <>
        Hands-on tutorials show how services across the Microsoft Cloud can be integrated.
      </>
    ),
  },
  {
    title: 'Step-by-Step Guidance',
    image: require('@site/static/img/step-by-step.png').default,
    description: (
      <>
        Step-by-step guidance helps you understand how to provision services and walks you through the end-to-end process.
      </>
    ),
  },
  {
    title: 'Enhance Your Skills',
    image: require('@site/static/img/enhance-skills.png').default,
    description: (
      <>
        Take your Microsoft Cloud skills to the next level by learning more about service to service communication, deployment, security, and more.
      </>
    ),
  },
];

function Feature({title, image, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg && <Svg className={styles.featureSvg} role="img" />}
        {image && <img className={styles.featureImage} src={image} alt="image" role="img" />}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
