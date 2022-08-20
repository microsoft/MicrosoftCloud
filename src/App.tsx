import React, { useState, useEffect } from 'react';
import Features from './components/features/Features';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';
import { Feature, SiteContent } from './shared/interfaces';
import packageJson from '../package.json';

function App({ dataSource }: { dataSource: string }) {
  const [siteContent, setSiteContent] = useState<SiteContent>({} as SiteContent);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFeatures = (data: SiteContent) => {
    const features = data.items.filter(item => item.feature).map(item => {
      return {
        position: item.feature?.position,
        type: item.type, 
        imageUrl: item.feature?.imageUrl, 
        url: item.feature?.url, 
        title: item.feature?.title,
        description: item.feature?.description
      };
    }).sort((a, b) => a.position! - b.position!) as Feature[];

    setFeatures(features);
  };

  const setCssVariables = (data: SiteContent) => {
    // iterate through data.metadata.themeColors and set css variables
    if (data.metadata.themeColors) {
      for (const key in data.metadata.themeColors) {
          const value = data.metadata.themeColors[key];
          document.documentElement.style.setProperty(`--${key}`, value);
      }
    }
  };

  useEffect(() => {
    const init = (data: SiteContent) => {
      document.title = data.metadata.title;
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = data.metadata.description;
      
      setCssVariables(data);
      setSiteContent(data);
      getFeatures(data);
    }

    fetch(dataSource)
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        init(data);
      }).catch(error => {
        console.log(error);
      }
      );
  }, [dataSource]);

  return (
    <>
    {isLoading 
      ? 
        <div>Loading...</div> 
      :      
        <>
          <Navbar data={siteContent.navbar} />
          <Header data={siteContent.header} />
          <Features data={features} />
          <Search data={siteContent.items} />
          <section className="footer">
            <div className="version">Version: {packageJson.version}</div>
          </section>
        </>
    }
    </>
  );
}

export default App;
