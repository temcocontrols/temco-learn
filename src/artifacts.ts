// What the build produced, available to any screen that offers a download.

import * as React from 'react';
import { loadArtifacts, type Artifacts } from './data';

export function useArtifacts(): Artifacts | undefined {
	const [artifacts, setArtifacts] = React.useState<Artifacts | undefined>(undefined);

	React.useEffect(() => {
		let live = true;
		void loadArtifacts().then((loaded) => {
			if (live) {
				setArtifacts(loaded);
			}
		});
		return () => {
			live = false;
		};
	}, []);

	return artifacts;
}
