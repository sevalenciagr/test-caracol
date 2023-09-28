import React, { useState, useEffect } from 'react';
import Handlebars from 'handlebars';
import { fetchData } from './api'; 

const MyComponent = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchData('/public/test.json'); 
        setJsonData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  if (!jsonData) {
    return <div>Cargando...</div>;
  }

  // Plantilla Handlebars
  const templateSource = `
    <div>
      <h1>{{headline}}</h1>
      <p>{{subHeadline}}</p>

      <ul>
        {{#each hotTopics}}
          <li><a href="{{url}}" target="_blank">{{title}}</a></li>
        {{/each}}
      </ul>

      <img src="{{lead.[0].image.src}}" alt="{{lead.[0].alt}}" />

      <audio controls>
        <source src="{{audioPlayer.[0].audioUrl}}" type="audio/mp3">
          Tu navegador no soporta el elemento de audio.
      </audio>

      
    </div>
  `;

  // Compila la plantilla Handlebars
  const template = Handlebars.compile(templateSource);

  // Renderiza la plantilla con los datos JSON
  const renderedTemplate = template(jsonData);

  return (
    <div dangerouslySetInnerHTML={{ __html: renderedTemplate }} />
  );
};

export default MyComponent;