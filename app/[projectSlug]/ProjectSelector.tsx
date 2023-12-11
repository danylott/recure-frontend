'use client';

import { Select } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ProjectData } from '@/app/[projectSlug]/projects/ProjectsTable';

const { Option } = Select;

interface Props {
  projects: ProjectData[];
  projectSlug: string;
}

export default function ProjectSelector({
  projects,
  projectSlug,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleProjectChange = useCallback((newProjectSlug: string) => {
    router.push(`/${newProjectSlug}/dashboard`);
  }, [pathname, router]);

  return (
    <Select
      placeholder='Select a project'
      value={projectSlug}
      onChange={handleProjectChange}
      size='middle'
      className='w-full'
    >
      {projects.map((project) => (
        <Option key={project.slug} value={project.slug}>
          {project.name}
        </Option>
      ))}
    </Select>
  );
}
