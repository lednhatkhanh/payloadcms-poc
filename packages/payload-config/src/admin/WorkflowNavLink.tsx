'use client'

import { Link, useConfig } from '@payloadcms/ui'

export function WorkflowNavLink() {
  const {
    config: {
      routes: { admin: adminPath },
    },
  } = useConfig()

  return (
    <p className="nav__link">
      <Link href={`${adminPath}/workflow`}>My requests</Link>
    </p>
  )
}
