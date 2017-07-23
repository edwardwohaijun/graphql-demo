import React, {Component} from 'react';
import timeago from 'timeago.js';

const RepoList = ({data}) =>
    <ul>
      {data.repositories.edges.map((item, idx) => {
        return (
            <li key={item.node.name}
                style={{paddingBottom: 24, borderBottom: '1px #e1e4e8 solid', listStyle: 'none'}}>
              <div style={{display: 'inline-block', marginBottom: 4, boxSizing: 'border-box'}}>
                <h3 style={{fontSize: 20, fontWeight: 600}}>{item.node.name}</h3>
              </div>

              {item.node.description
                  ? <div style={{boxSizing: 'border-box'}}>
                      <p style={{display: 'inline-block', marginBottom: 8, color: '#586069', marginTop: 0}}>{item.node.description}</p>
                    </div>
                  : null
              }

              <div style={{fontSize: 12, marginTop: 8, color: '#586069', boxSizing: 'border-box'}}>
                {item.node.primaryLanguage
                    ? <span style={{backgroundColor: item.node.primaryLanguage.color,
                                    position: 'relative', top: 1, display: 'inline-block', width: 12, height: 12, borderRadius: '50%'}}></span>
                    : null
                }
                {item.node.primaryLanguage
                    ? <span
                    style={{marginRight: 16, marginLeft: 8, boxSizing: 'border-box', fontSize: 12, color: '#586069'}}>{item.node.primaryLanguage.name}</span>
                    : null
                }
                <span style={{color: '#586069'}}>Updated {timeago().format(item.node.pushedAt)}</span>
              </div>
            </li>)
      })}
    </ul>;

export default RepoList
