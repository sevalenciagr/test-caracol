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

  // Define la plantilla Handlebars
  const templateSource = `
  <div class="mi-componente">
    <!-- Agrega la sección de navegación -->
    <nav class="navigation">
      <ul>
        {{#each navigation.[0].items}}
          <li><a href="{{href}}" class="{{#if isCurrent}}current{{/if}}">{{text}}</a></li>
        {{/each}}
      </ul>
    </nav>
    <!-- Agrega el logo -->
    <a href="{{logo.[0].href}}">
      <img src="{{logo.[0].image.src}}" alt="{{logo.[0].alt}}" class="logo" />
    </a>
    
    <!-- Utiliza el componente de Navbar de Bootstrap para hot-topics -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbar-nav">
    {{#each hotTopics}}
    <a class="nav-link" href="{{url}}" target="_blank">{{title}}</a>
    {{/each}}
    </div>
    </nav>
    
    <h1>{{headline}}</h1>
    <p class="subheadline">{{subHeadline}}</p>
    <img src="{{lead.[0].image.src}}" alt="{{lead.[0].alt}}" class="lead-image" />

    <!-- Agrega la sección del audio player con una clase específica -->
    <audio controls class="audio-player">
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