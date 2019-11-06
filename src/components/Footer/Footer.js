import React from 'react';
import IntlMessages from 'Util/IntlMessages';
import AppConfig from 'Constants/AppConfig';

const Footer = () => (
	<div className="rct-footer d-flex justify-content-between align-items-center">
		<ul className="list-inline footer-menus mb-0">
			<li className="list-inline-item">
				<a rel="noopener noreferrer" href="https://solartopps.com/privacy#privacy" target="_blank"><IntlMessages id="sidebar.privacyPolicy" />
					</a>
			</li>
			<li className="list-inline-item">
				<a rel="noopener noreferrer" href="https://solartopps.com/termsConditions#Terms" target="_blank"><IntlMessages id="sidebar.terms&Conditions" /></a>
			</li>
		</ul>
		<span className="mb-0">{AppConfig.copyRightText}</span>
	</div>
);

export default Footer;
