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

  const templateSource = `
    <div class="container">
      <div class="row">
        <div class="col-md-6 order-md-1">
          <ul class="nav-list">
            {{#each navigation.[0].items}}
              <li class="nav-item">
                <a href="{{href}}" class="{{#if isCurrent}}current{{/if}}">{{text}}</a>
              </li>
            {{/each}}
          </ul>
        </div>

        <div class="col-md-6 order-md-2">
          <a href="{{logo.[0].href}}">
            <img src="{{logo.[0].image.src}}" alt="{{logo.[0].alt}}" class="img-fluid logo" />
          </a>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="navbar-nav">
              {{#each hotTopics}}
                <a class="nav-link" href="{{url}}" target="_blank">{{title}}</a>
              {{/each}}
            </div>
          </nav>
        </div>

        <div class="col-lg-6">
          <div class="social">
            {{#each social.[0].items}}
              <a href="{{href}}" target="_blank">{{socialService}}</a>
            {{/each}}
          </div>
        </div>
      </div>

      <div class="page-lead">
        {{#each pageLead}}
          <img src="{{image.src}}" alt="{{alt}}" class="img-fluid w-100" />
        {{/each}}
      </div>

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          {{#each breadcrumbs}}
            <li class="breadcrumb-item"><a href="{{href}}">{{body}}</a></li>
          {{/each}}
        </ol>
      </nav>

      <div class="row">
        <div class="col-lg-6">
          <img src="{{lead.[0].image.src}}" alt="{{lead.[0].alt}}" class="img-fluid lead-image" />
        </div>

        <div class="col-lg-6">
          <h1 class="text-start">{{headline}}</h1>
          <p class="text-start">{{subHeadline}}</p>
          <audio controls class="audio-player">
            <source src="{{audioPlayer.[0].audioUrl}}" type="audio/mp3">
            Tu navegador no soporta el elemento de audio.
          </audio>

          <h5 class="text-start">Compartir:</h5>
          <div class="actions text-start">
            {{#each actions.[0].items}}
              <a href="{{shareHref}}" target="{{target}}">{{body}}</a>
            {{/each}}
          </div>
        </div>
      </div>
    </div>
  `;

  const template = Handlebars.compile(templateSource);
  const renderedTemplate = template(jsonData);

  return (
    <div dangerouslySetInnerHTML={{ __html: renderedTemplate }} />
  );
};

export default MyComponent;
