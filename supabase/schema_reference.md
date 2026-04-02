# Supabase Schema Reference

## Summary

- Total schemas: 8
- Total tables: 49

## Schemas

- auth: 23 tables
- extensions: 2 tables
- graphql: 0 tables
- graphql_public: 0 tables
- public: 11 tables
- realtime: 3 tables
- storage: 8 tables
- vault: 2 tables

## Tables and Columns

### auth

#### audit_log_entries

| Column | Type | Nullable | Default |
|---|---|---|---|
| instance_id | uuid | YES |  |
| id | uuid | NO |  |
| payload | json | YES |  |
| created_at | timestamp with time zone | YES |  |
| ip_address | character varying | NO | ''::character varying |

#### custom_oauth_providers

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| provider_type | text | NO |  |
| identifier | text | NO |  |
| name | text | NO |  |
| client_id | text | NO |  |
| client_secret | text | NO |  |
| acceptable_client_ids | ARRAY | NO | '{}'::text[] |
| scopes | ARRAY | NO | '{}'::text[] |
| pkce_enabled | boolean | NO | true |
| attribute_mapping | jsonb | NO | '{}'::jsonb |
| authorization_params | jsonb | NO | '{}'::jsonb |
| enabled | boolean | NO | true |
| email_optional | boolean | NO | false |
| issuer | text | YES |  |
| discovery_url | text | YES |  |
| skip_nonce_check | boolean | NO | false |
| cached_discovery | jsonb | YES |  |
| discovery_cached_at | timestamp with time zone | YES |  |
| authorization_url | text | YES |  |
| token_url | text | YES |  |
| userinfo_url | text | YES |  |
| jwks_uri | text | YES |  |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |

#### flow_state

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| user_id | uuid | YES |  |
| auth_code | text | YES |  |
| code_challenge_method | USER-DEFINED | YES |  |
| code_challenge | text | YES |  |
| provider_type | text | NO |  |
| provider_access_token | text | YES |  |
| provider_refresh_token | text | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| authentication_method | text | NO |  |
| auth_code_issued_at | timestamp with time zone | YES |  |
| invite_token | text | YES |  |
| referrer | text | YES |  |
| oauth_client_state_id | uuid | YES |  |
| linking_target_id | uuid | YES |  |
| email_optional | boolean | NO | false |

#### identities

| Column | Type | Nullable | Default |
|---|---|---|---|
| provider_id | text | NO |  |
| user_id | uuid | NO |  |
| identity_data | jsonb | NO |  |
| provider | text | NO |  |
| last_sign_in_at | timestamp with time zone | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| email | text | YES |  |
| id | uuid | NO | gen_random_uuid() |

#### instances

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| uuid | uuid | YES |  |
| raw_base_config | text | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |

#### mfa_amr_claims

| Column | Type | Nullable | Default |
|---|---|---|---|
| session_id | uuid | NO |  |
| created_at | timestamp with time zone | NO |  |
| updated_at | timestamp with time zone | NO |  |
| authentication_method | text | NO |  |
| id | uuid | NO |  |

#### mfa_challenges

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| factor_id | uuid | NO |  |
| created_at | timestamp with time zone | NO |  |
| verified_at | timestamp with time zone | YES |  |
| ip_address | inet | NO |  |
| otp_code | text | YES |  |
| web_authn_session_data | jsonb | YES |  |

#### mfa_factors

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| user_id | uuid | NO |  |
| friendly_name | text | YES |  |
| factor_type | USER-DEFINED | NO |  |
| status | USER-DEFINED | NO |  |
| created_at | timestamp with time zone | NO |  |
| updated_at | timestamp with time zone | NO |  |
| secret | text | YES |  |
| phone | text | YES |  |
| last_challenged_at | timestamp with time zone | YES |  |
| web_authn_credential | jsonb | YES |  |
| web_authn_aaguid | uuid | YES |  |
| last_webauthn_challenge_data | jsonb | YES |  |

#### oauth_authorizations

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| authorization_id | text | NO |  |
| client_id | uuid | NO |  |
| user_id | uuid | YES |  |
| redirect_uri | text | NO |  |
| scope | text | NO |  |
| state | text | YES |  |
| resource | text | YES |  |
| code_challenge | text | YES |  |
| code_challenge_method | USER-DEFINED | YES |  |
| response_type | USER-DEFINED | NO | 'code'::auth.oauth_response_type |
| status | USER-DEFINED | NO | 'pending'::auth.oauth_authorization_status |
| authorization_code | text | YES |  |
| created_at | timestamp with time zone | NO | now() |
| expires_at | timestamp with time zone | NO | (now() + '00:03:00'::interval) |
| approved_at | timestamp with time zone | YES |  |
| nonce | text | YES |  |

#### oauth_client_states

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| provider_type | text | NO |  |
| code_verifier | text | YES |  |
| created_at | timestamp with time zone | NO |  |

#### oauth_clients

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| client_secret_hash | text | YES |  |
| registration_type | USER-DEFINED | NO |  |
| redirect_uris | text | NO |  |
| grant_types | text | NO |  |
| client_name | text | YES |  |
| client_uri | text | YES |  |
| logo_uri | text | YES |  |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |
| deleted_at | timestamp with time zone | YES |  |
| client_type | USER-DEFINED | NO | 'confidential'::auth.oauth_client_type |
| token_endpoint_auth_method | text | NO |  |

#### oauth_consents

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| user_id | uuid | NO |  |
| client_id | uuid | NO |  |
| scopes | text | NO |  |
| granted_at | timestamp with time zone | NO | now() |
| revoked_at | timestamp with time zone | YES |  |

#### one_time_tokens

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| user_id | uuid | NO |  |
| token_type | USER-DEFINED | NO |  |
| token_hash | text | NO |  |
| relates_to | text | NO |  |
| created_at | timestamp without time zone | NO | now() |
| updated_at | timestamp without time zone | NO | now() |

#### refresh_tokens

| Column | Type | Nullable | Default |
|---|---|---|---|
| instance_id | uuid | YES |  |
| id | bigint | NO | nextval('auth.refresh_tokens_id_seq'::regclass) |
| token | character varying | YES |  |
| user_id | character varying | YES |  |
| revoked | boolean | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| parent | character varying | YES |  |
| session_id | uuid | YES |  |

#### saml_providers

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| sso_provider_id | uuid | NO |  |
| entity_id | text | NO |  |
| metadata_xml | text | NO |  |
| metadata_url | text | YES |  |
| attribute_mapping | jsonb | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| name_id_format | text | YES |  |

#### saml_relay_states

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| sso_provider_id | uuid | NO |  |
| request_id | text | NO |  |
| for_email | text | YES |  |
| redirect_to | text | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| flow_state_id | uuid | YES |  |

#### schema_migrations

| Column | Type | Nullable | Default |
|---|---|---|---|
| version | character varying | NO |  |

#### sessions

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| user_id | uuid | NO |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| factor_id | uuid | YES |  |
| aal | USER-DEFINED | YES |  |
| not_after | timestamp with time zone | YES |  |
| refreshed_at | timestamp without time zone | YES |  |
| user_agent | text | YES |  |
| ip | inet | YES |  |
| tag | text | YES |  |
| oauth_client_id | uuid | YES |  |
| refresh_token_hmac_key | text | YES |  |
| refresh_token_counter | bigint | YES |  |
| scopes | text | YES |  |

#### sso_domains

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| sso_provider_id | uuid | NO |  |
| domain | text | NO |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |

#### sso_providers

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO |  |
| resource_id | text | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| disabled | boolean | YES |  |

#### users

| Column | Type | Nullable | Default |
|---|---|---|---|
| instance_id | uuid | YES |  |
| id | uuid | NO |  |
| aud | character varying | YES |  |
| role | character varying | YES |  |
| email | character varying | YES |  |
| encrypted_password | character varying | YES |  |
| email_confirmed_at | timestamp with time zone | YES |  |
| invited_at | timestamp with time zone | YES |  |
| confirmation_token | character varying | YES |  |
| confirmation_sent_at | timestamp with time zone | YES |  |
| recovery_token | character varying | YES |  |
| recovery_sent_at | timestamp with time zone | YES |  |
| email_change_token_new | character varying | YES |  |
| email_change | character varying | YES |  |
| email_change_sent_at | timestamp with time zone | YES |  |
| last_sign_in_at | timestamp with time zone | YES |  |
| raw_app_meta_data | jsonb | YES |  |
| raw_user_meta_data | jsonb | YES |  |
| is_super_admin | boolean | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| phone | text | YES | NULL::character varying |
| phone_confirmed_at | timestamp with time zone | YES |  |
| phone_change | text | YES | ''::character varying |
| phone_change_token | character varying | YES | ''::character varying |
| phone_change_sent_at | timestamp with time zone | YES |  |
| confirmed_at | timestamp with time zone | YES |  |
| email_change_token_current | character varying | YES | ''::character varying |
| email_change_confirm_status | smallint | YES | 0 |
| banned_until | timestamp with time zone | YES |  |
| reauthentication_token | character varying | YES | ''::character varying |
| reauthentication_sent_at | timestamp with time zone | YES |  |
| is_sso_user | boolean | NO | false |
| deleted_at | timestamp with time zone | YES |  |
| is_anonymous | boolean | NO | false |

#### webauthn_challenges

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | YES |  |
| challenge_type | text | NO |  |
| session_data | jsonb | NO |  |
| created_at | timestamp with time zone | NO | now() |
| expires_at | timestamp with time zone | NO |  |

#### webauthn_credentials

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| credential_id | bytea | NO |  |
| public_key | bytea | NO |  |
| attestation_type | text | NO | ''::text |
| aaguid | uuid | YES |  |
| sign_count | bigint | NO | 0 |
| transports | jsonb | NO | '[]'::jsonb |
| backup_eligible | boolean | NO | false |
| backed_up | boolean | NO | false |
| friendly_name | text | NO | ''::text |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |
| last_used_at | timestamp with time zone | YES |  |

### extensions

#### pg_stat_statements

| Column | Type | Nullable | Default |
|---|---|---|---|
| userid | oid | YES |  |
| dbid | oid | YES |  |
| toplevel | boolean | YES |  |
| queryid | bigint | YES |  |
| query | text | YES |  |
| plans | bigint | YES |  |
| total_plan_time | double precision | YES |  |
| min_plan_time | double precision | YES |  |
| max_plan_time | double precision | YES |  |
| mean_plan_time | double precision | YES |  |
| stddev_plan_time | double precision | YES |  |
| calls | bigint | YES |  |
| total_exec_time | double precision | YES |  |
| min_exec_time | double precision | YES |  |
| max_exec_time | double precision | YES |  |
| mean_exec_time | double precision | YES |  |
| stddev_exec_time | double precision | YES |  |
| rows | bigint | YES |  |
| shared_blks_hit | bigint | YES |  |
| shared_blks_read | bigint | YES |  |
| shared_blks_dirtied | bigint | YES |  |
| shared_blks_written | bigint | YES |  |
| local_blks_hit | bigint | YES |  |
| local_blks_read | bigint | YES |  |
| local_blks_dirtied | bigint | YES |  |
| local_blks_written | bigint | YES |  |
| temp_blks_read | bigint | YES |  |
| temp_blks_written | bigint | YES |  |
| shared_blk_read_time | double precision | YES |  |
| shared_blk_write_time | double precision | YES |  |
| local_blk_read_time | double precision | YES |  |
| local_blk_write_time | double precision | YES |  |
| temp_blk_read_time | double precision | YES |  |
| temp_blk_write_time | double precision | YES |  |
| wal_records | bigint | YES |  |
| wal_fpi | bigint | YES |  |
| wal_bytes | numeric | YES |  |
| jit_functions | bigint | YES |  |
| jit_generation_time | double precision | YES |  |
| jit_inlining_count | bigint | YES |  |
| jit_inlining_time | double precision | YES |  |
| jit_optimization_count | bigint | YES |  |
| jit_optimization_time | double precision | YES |  |
| jit_emission_count | bigint | YES |  |
| jit_emission_time | double precision | YES |  |
| jit_deform_count | bigint | YES |  |
| jit_deform_time | double precision | YES |  |
| stats_since | timestamp with time zone | YES |  |
| minmax_stats_since | timestamp with time zone | YES |  |

#### pg_stat_statements_info

| Column | Type | Nullable | Default |
|---|---|---|---|
| dealloc | bigint | YES |  |
| stats_reset | timestamp with time zone | YES |  |

### graphql

(No tables)

### graphql_public

(No tables)

### public

#### analytics_summary

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | text | NO |  |
| period_start | timestamp with time zone | NO |  |
| period_end | timestamp with time zone | NO |  |
| period_type | text | NO |  |
| total_sessions | integer | NO |  |
| total_playtime_seconds | integer | NO |  |
| avg_score | numeric | YES |  |
| avg_distance | numeric | YES |  |
| avg_reaction_time_ms | numeric | YES |  |
| avg_collision_rate | numeric | YES |  |
| avg_blind_localization_accuracy | numeric | YES |  |
| avg_blind_navigation_efficiency | numeric | YES |  |
| avg_adhd_attention_duration | numeric | YES |  |
| avg_adhd_impulsivity_index | numeric | YES |  |
| avg_adhd_consistency | numeric | YES |  |
| avg_gesture_accuracy | numeric | YES |  |
| score_trend | numeric | YES |  |
| reaction_time_trend | numeric | YES |  |
| created_at | timestamp with time zone | YES | now() |

#### game_progress

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| user_id | uuid | YES |  |
| game_slug | text | NO |  |
| level_number | integer | NO |  |
| module_number | integer | NO |  |
| high_score | integer | YES | 0 |
| completed | boolean | YES | false |
| last_played | timestamp with time zone | YES | now() |
| created_at | timestamp with time zone | YES | now() |
| username | text | YES |  |

#### game_score_history

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| user_id | uuid | YES |  |
| game_slug | text | NO |  |
| level_number | integer | NO |  |
| score | integer | NO |  |
| completed | boolean | YES | false |
| created_at | timestamp with time zone | YES | now() |

#### game_sessions

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | text | NO |  |
| started_at | timestamp with time zone | YES | now() |
| ended_at | timestamp with time zone | YES |  |
| duration_seconds | integer | YES |  |
| difficulty_level | integer | NO |  |
| control_method | text | NO |  |
| final_score | integer | NO |  |
| distance_traveled | numeric | NO |  |
| collisions | integer | NO |  |
| near_misses | integer | NO |  |
| successful_dodges | integer | NO |  |
| mean_reaction_time_ms | numeric | YES |  |
| median_reaction_time_ms | numeric | YES |  |
| reaction_time_sd_ms | numeric | YES |  |
| min_reaction_time_ms | numeric | YES |  |
| max_reaction_time_ms | numeric | YES |  |
| blind_sound_localization_accuracy | numeric | YES |  |
| blind_navigation_efficiency | numeric | YES |  |
| blind_collision_avoidance_rate | numeric | YES |  |
| blind_stereo_awareness_score | numeric | YES |  |
| adhd_sustained_attention_duration_sec | numeric | YES |  |
| adhd_impulsivity_index | numeric | YES |  |
| adhd_attention_consistency | numeric | YES |  |
| adhd_premature_response_rate | numeric | YES |  |
| adhd_task_completion_quality | numeric | YES |  |
| gesture_accuracy_rate | numeric | YES |  |
| gesture_recognition_latency_ms | numeric | YES |  |
| total_gestures_detected | integer | YES |  |
| left_gesture_count | integer | YES |  |
| right_gesture_count | integer | YES |  |
| browser_info | text | YES |  |
| device_info | text | YES |  |

#### mandala_designs

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | bigint | NO | nextval('mandala_designs_id_seq'::regclass) |
| user_id | uuid | NO |  |
| design_id | text | NO |  |
| design_name | text | NO |  |
| template_name | text | YES |  |
| color_map | jsonb | YES | '{}'::jsonb |
| region_count | integer | YES | 0 |
| image_data | text | YES |  |
| metadata | jsonb | YES | '{}'::jsonb |
| created_at | timestamp with time zone | YES | now() |
| updated_at | timestamp with time zone | YES | now() |

#### mandala_game_sessions

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | bigint | NO | nextval('mandala_game_sessions_id_seq'::regclass) |
| user_id | uuid | NO |  |
| started_at | timestamp with time zone | YES | now() |
| completed_at | timestamp with time zone | YES |  |
| duration_seconds | integer | YES | 0 |
| regions_painted | integer | YES | 0 |
| completion_percentage | real | YES | 0.0 |
| created_at | timestamp with time zone | YES | now() |

#### posabets_progress

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| user_id | uuid | YES |  |
| current_level | integer | YES | 0 |
| letters_completed | ARRAY | YES | '{}'::text[] |
| words_completed | ARRAY | YES | '{}'::text[] |
| badges | ARRAY | YES | '{}'::text[] |
| total_stars | integer | YES | 0 |
| current_streak | integer | YES | 0 |
| best_streak | integer | YES | 0 |
| last_played | timestamp with time zone | YES | now() |
| created_at | timestamp with time zone | YES | now() |

#### posabets_session_history

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| user_id | uuid | YES |  |
| session_type | text | NO |  |
| target | text | NO |  |
| stars_earned | integer | YES | 0 |
| streak_achieved | integer | YES | 0 |
| completed | boolean | YES | false |
| played_at | timestamp with time zone | YES | now() |

#### session_events

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| session_id | uuid | NO |  |
| timestamp_ms | bigint | NO |  |
| event_type | text | NO |  |
| event_data | jsonb | NO |  |
| player_x | numeric | YES |  |
| player_y | numeric | YES |  |
| car_x | numeric | YES |  |
| car_y | numeric | YES |  |
| current_lane | integer | YES |  |
| horn_volume | numeric | YES |  |
| horn_pan | numeric | YES |  |
| sound_distance | numeric | YES |  |
| gesture_type | text | YES |  |
| gesture_confidence | numeric | YES |  |
| gesture_latency_ms | numeric | YES |  |
| hand_landmarks | jsonb | YES |  |

#### user_profiles

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | text | NO |  |
| roles | ARRAY | NO |  |
| created_at | timestamp with time zone | YES | now() |
| updated_at | timestamp with time zone | YES | now() |
| preferred_difficulty | integer | YES | 3 |
| preferred_control | text | YES | 'gesture'::text |
| total_sessions | integer | YES | 0 |
| total_playtime_seconds | integer | YES | 0 |

#### user_progress

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | text | NO |  |
| baseline_reaction_time_ms | numeric | YES |  |
| baseline_collision_rate | numeric | YES |  |
| baseline_score | numeric | YES |  |
| baseline_date | timestamp with time zone | YES |  |
| current_reaction_time_ms | numeric | YES |  |
| current_collision_rate | numeric | YES |  |
| current_score | numeric | YES |  |
| improvement_rate_percent | numeric | YES |  |
| sessions_to_plateau | integer | YES |  |
| plateau_detected | boolean | YES | false |
| milestones | jsonb | YES |  |
| blind_progress | jsonb | YES |  |
| adhd_progress | jsonb | YES |  |
| updated_at | timestamp with time zone | YES | now() |

### realtime

#### messages

| Column | Type | Nullable | Default |
|---|---|---|---|
| topic | text | NO |  |
| extension | text | NO |  |
| payload | jsonb | YES |  |
| event | text | YES |  |
| private | boolean | YES | false |
| updated_at | timestamp without time zone | NO | now() |
| inserted_at | timestamp without time zone | NO | now() |
| id | uuid | NO | gen_random_uuid() |

#### schema_migrations

| Column | Type | Nullable | Default |
|---|---|---|---|
| version | bigint | NO |  |
| inserted_at | timestamp without time zone | YES |  |

#### subscription

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | bigint | NO |  |
| subscription_id | uuid | NO |  |
| entity | regclass | NO |  |
| filters | ARRAY | NO | '{}'::realtime.user_defined_filter[] |
| claims | jsonb | NO |  |
| claims_role | regrole | NO |  |
| created_at | timestamp without time zone | NO | timezone('utc'::text, now()) |
| action_filter | text | YES | '*'::text |

### storage

#### buckets

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | text | NO |  |
| name | text | NO |  |
| owner | uuid | YES |  |
| created_at | timestamp with time zone | YES | now() |
| updated_at | timestamp with time zone | YES | now() |
| public | boolean | YES | false |
| avif_autodetection | boolean | YES | false |
| file_size_limit | bigint | YES |  |
| allowed_mime_types | ARRAY | YES |  |
| owner_id | text | YES |  |
| type | USER-DEFINED | NO | 'STANDARD'::storage.buckettype |

#### buckets_analytics

| Column | Type | Nullable | Default |
|---|---|---|---|
| name | text | NO |  |
| type | USER-DEFINED | NO | 'ANALYTICS'::storage.buckettype |
| format | text | NO | 'ICEBERG'::text |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |
| id | uuid | NO | gen_random_uuid() |
| deleted_at | timestamp with time zone | YES |  |

#### buckets_vectors

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | text | NO |  |
| type | USER-DEFINED | NO | 'VECTOR'::storage.buckettype |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |

#### migrations

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | integer | NO |  |
| name | character varying | NO |  |
| hash | character varying | NO |  |
| executed_at | timestamp without time zone | YES | CURRENT_TIMESTAMP |

#### objects

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| bucket_id | text | YES |  |
| name | text | YES |  |
| owner | uuid | YES |  |
| created_at | timestamp with time zone | YES | now() |
| updated_at | timestamp with time zone | YES | now() |
| last_accessed_at | timestamp with time zone | YES | now() |
| metadata | jsonb | YES |  |
| path_tokens | ARRAY | YES |  |
| version | text | YES |  |
| owner_id | text | YES |  |
| user_metadata | jsonb | YES |  |

#### s3_multipart_uploads

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | text | NO |  |
| in_progress_size | bigint | NO | 0 |
| upload_signature | text | NO |  |
| bucket_id | text | NO |  |
| key | text | NO |  |
| version | text | NO |  |
| owner_id | text | YES |  |
| created_at | timestamp with time zone | NO | now() |
| user_metadata | jsonb | YES |  |

#### s3_multipart_uploads_parts

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| upload_id | text | NO |  |
| size | bigint | NO | 0 |
| part_number | integer | NO |  |
| bucket_id | text | NO |  |
| key | text | NO |  |
| etag | text | NO |  |
| owner_id | text | YES |  |
| version | text | NO |  |
| created_at | timestamp with time zone | NO | now() |

#### vector_indexes

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | text | NO | gen_random_uuid() |
| name | text | NO |  |
| bucket_id | text | NO |  |
| data_type | text | NO |  |
| dimension | integer | NO |  |
| distance_metric | text | NO |  |
| metadata_configuration | jsonb | YES |  |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |

### vault

#### decrypted_secrets

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | YES |  |
| name | text | YES |  |
| description | text | YES |  |
| secret | text | YES |  |
| decrypted_secret | text | YES |  |
| key_id | uuid | YES |  |
| nonce | bytea | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |

#### secrets

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | YES |  |
| description | text | NO | ''::text |
| secret | text | NO |  |
| key_id | uuid | YES |  |
| nonce | bytea | YES | vault._crypto_aead_det_noncegen() |
| created_at | timestamp with time zone | NO | CURRENT_TIMESTAMP |
| updated_at | timestamp with time zone | NO | CURRENT_TIMESTAMP |
