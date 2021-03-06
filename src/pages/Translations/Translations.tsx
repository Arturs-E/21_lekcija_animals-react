import React, { FormEvent, useState } from 'react';
import './Translations.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from '../../components/Buttons/Button';
import { addTranslations } from '../../redux/animalsSlice';

const Translations = () => {
  const animalData = useAppSelector((state) => state.animals);
  const dispatch = useAppDispatch();

  const initialState = animalData.map(({ name }) => (name));
  const [translations, setTranslations] = useState(initialState);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTranslations(translations));
  };

  if (animalData.length === 0) {
    return <h2 style={{ textAlign: 'center' }}>No animals added yet!</h2>;
  }

  return (
    <section>
      <h2 className="translations-page-heading">Animal name translations</h2>
      <form onSubmit={(e) => submitHandler(e)}>
        <table className="animal-translations">
          <thead>
            <tr>
              <th>Animal</th>
              <th>Language</th>
              <th>Animal Name</th>
            </tr>
          </thead>
          <tbody>
            {
              animalData.map(({ name }, arrIndex) => {
                const languageKeys = Object.keys(name);
                const languageValues = Object.values(name);
                const numberOfLanguages = languageKeys.length;

                return (
                  languageValues.map((item, index) => (
                    <tr key={item}>
                      {!index && (
                      <th
                        rowSpan={numberOfLanguages}
                        className="animal-translations__animal-name"
                      >
                        {item}
                      </th>
                      )}
                      <td className="animal-translations__language-code">{languageKeys[index]}</td>
                      {!index
                        ? <td className="animal-translations__animal-name">{item}</td>
                        : (
                          <td
                            className="animal-translations__animal-name--input"
                          >
                            <input
                              type="text"
                              className="animal-translations__animal-name-input"
                              value={translations[arrIndex][languageKeys[index]]}
                              onChange={(e) => {
                                const newTranslationsState = [...translations];
                                const newLanguageTranslations = { ...newTranslationsState[arrIndex] };
                                newLanguageTranslations[languageKeys[index]] = e.target.value.toLowerCase();
                                newTranslationsState[arrIndex] = newLanguageTranslations;
                                setTranslations(newTranslationsState);
                              }}
                            />
                          </td>
                        )}
                    </tr>
                  ))
                );
              })
             }
          </tbody>
        </table>
        <div className="animal-translations__submit-button-wrapper">
          <Button type="submit" title="Submit" />
        </div>
      </form>
    </section>
  );
};

export default Translations;
