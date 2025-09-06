
import React from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION } from '@/constants/navigation';

export function MobileNav() {
  return (
    <div className="flex flex-col space-y-4 p-6">
      <Link to="/" className="text-lg font-bold">
        Civora Nexus
      </Link>
      
      <div className="flex flex-col space-y-4">
        {NAVIGATION.map((item) => (
          <div key={item.label} className="flex flex-col space-y-2">
            {item.subGroups ? (
              <>
                <span className="font-medium text-foreground">{item.label}</span>
                <div className="ml-4 flex flex-col space-y-2">
                  {item.subGroups.map((subGroup) => (
                    <div key={subGroup.label} className="flex flex-col space-y-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {subGroup.label}
                      </span>
                      {subGroup.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="text-sm text-muted-foreground hover:text-foreground ml-2"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={item.href || '/'}
                className="text-foreground hover:text-foreground/80"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
