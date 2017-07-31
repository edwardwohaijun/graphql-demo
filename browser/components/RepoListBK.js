import React, {Component} from 'react';
import timeago from 'timeago.js';

const RepoList = ({changeTab, repoInfo, ownRepoCount, isShort, repoClickHanlder, defaultRepoIdx}) => {
  var style;
  return (
      <ul style={{paddingLeft: 0}}>
        {repoInfo.map((item, idx) => {
          style = {borderBottom: '1px #e1e4e8 solid', listStyle: 'none'};
          if (defaultRepoIdx == idx) style.backgroundColor = '#eee';
          if (isShort) {
            return (
                <li key={idx} className='repoItem' onClick={() => repoClickHanlder(idx)}
                    style={style}>
                  <div style={{display: 'inline-block', marginBottom: 4, boxSizing: 'border-box'}}>
                    {idx >= ownRepoCount ? <span style={{marginRight: 20}}>★</span> : null}<h3 style={{display: 'inline-block',fontSize: 20, fontWeight: 600}}>{item.name}</h3>
                  </div>
                </li>
            )
          }

          style.paddingBottom = 24;
          return (
              <li key={idx} className='repoItem' onClick={() => {repoClickHanlder(idx); changeTab("commit")}}
                  style={style}>
                <div style={{display: 'inline-block', marginBottom: 4, boxSizing: 'border-box'}}>
                  {idx >= ownRepoCount ? <span style={{marginRight: 20}}>★</span> : null}<h3 style={{display: 'inline-block', fontSize: 20, fontWeight: 600}}>{item.name}</h3>
                </div>

                {item.description
                    ? <div style={{boxSizing: 'border-box'}}>
                        <p style={{display: 'inline-block', marginBottom: 8, color: '#586069', marginTop: 0}}>{item.description}</p>
                      </div>
                    : null
                }

                <div style={{fontSize: 12, marginTop: 8, color: '#586069', boxSizing: 'border-box'}}>
                  {item.primaryLanguage
                      ? <span style={{backgroundColor: item.primaryLanguage.color,
                                      position: 'relative', top: 1, display: 'inline-block', width: 12, height: 12, borderRadius: '50%'}}></span>
                      : null
                  }
                  {item.primaryLanguage
                      ? <span
                        style={{marginRight: 16, marginLeft: 8, boxSizing: 'border-box', fontSize: 12, color: '#586069'}}>{item.primaryLanguage.name}</span>
                      : null
                  }
                  <span style={{color: '#586069'}}>Updated {timeago().format(item.pushedAt)}</span>
                </div>
              </li>)
        })}
      </ul>);
};
export default RepoList
