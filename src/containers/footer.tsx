import React, { memo, useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/language.context';
import { User } from '../types/user';

const Footer = memo((prop:{user:User|null}) => {
     useContext(LanguageContext);
    //useTranslation();
    return (
      <div className='p-5'>
        <Trans values={{ date: new Date() }} i18nKey="dateNow"></Trans>
      </div>
    );
});

export default Footer;