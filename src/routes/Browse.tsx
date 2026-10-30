// `/:key` is either a section or a project: one address space, decided by the catalog rather than by the path shape.
//
// A reader types `/#/t3000/` or `/#/documentation` without knowing which kind of thing it is, and the site should not make
// them know: sections are tried first (there are six, and they are the site's own words), then projects.

import { useParams } from 'react-router-dom';
import { useCatalog } from '../catalog';
import { SectionPage } from './SectionPage';
import { ProjectPage } from './ProjectPage';
import { NotFound } from './NotFound';

export function Browse() {
	const catalog = useCatalog();
	const { key } = useParams();

	const section = catalog.sections.find((entry) => entry.id === key);
	if (section !== undefined) {
		return <SectionPage section={section} />;
	}
	const project = catalog.projects.find((entry) => entry.id === key);
	if (project !== undefined) {
		return <ProjectPage project={project} />;
	}
	return <NotFound what={key} />;
}